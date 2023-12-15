import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { environment } from '~/environments/environment';
import { HeaderService } from '../../default-layout/services';
import { CartService } from '../services';
import { Router } from '@angular/router';

@Component({
    selector: 'client-cart',
    templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit
{
    public carts: any[];
    public webUrl: string;
    public total: number;
    public form: any;
    public isSubmitting!: boolean;

    constructor(
        private _cartService: CartService,
        private _headerService: HeaderService,
        private _router: Router,
        private _title: Title,
        private _toastrService: ToastrService,
    ) {
        _title.setTitle('Keranjang | Dapuremaqu');
        this.carts = [];
        this.webUrl = environment.webUrl;
        this.total = 0;
    }
    
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     */
    ngOnInit(): void {
        this.clearForm();
        this._getCartItem();
    }

    /**
	 * Reset value of object form before making a request
	 * to add resources.
	 *
	 * @return void
	 */
	clearForm(): void {
		this.form = {
            nama_pelanggan: null,
            alamat: null,
            nomor_hp: null,
            email: null,
            products: []
        };
	}

    private _getCartItem(): void {
        const carts = localStorage.getItem('carts');
        if (carts) this.carts = JSON.parse(carts);
        this.form.products = this.carts;
        this.hitungTotalHarga();
    }

    deleteItem(id: number): void {
        const itemIndex = this.carts.findIndex((obj) => obj.id_produk === id);
        if (itemIndex !== -1) {
            this.carts.splice(itemIndex, 1);
            localStorage.setItem('carts', JSON.stringify(this.carts));
            this.form.products = this.carts;
            
            const totalQty = this.carts.reduce((accumulator, currentItem) => accumulator + currentItem.qty, 0);
            this._headerService.updateCart(totalQty);
            this.hitungTotalHarga();
        }
    }

    hitungTotalHarga(): void {
        let total = 0;
        this.carts.forEach(product => {
            total += product.harga * product.qty;
        });
    
        this.total = total
    }

    private _validate(): boolean {
        if (!this.form.nama_pelanggan) {
            this._toastrService.error('Kolom isian nama tidak boleh kosong');
            return false;
        }

        if (!this.form.alamat) {
            this._toastrService.error('Kolom isian alamat tidak boleh kosong');
            return false;
        }

        if (!this.form.nomor_hp) {
            this._toastrService.error('Kolom isian nomor hp tidak boleh kosong');
            return false;
        }

        if (!this.form.email) {
            this._toastrService.error('Kolom isian nomor hp tidak boleh kosong');
            return false;
        }

        if (this.form.products.length == 0) {
            this._toastrService.error('Minimal harus ada 1 data produk');
            return false;
        }

        return true;
    }

    checkout(): void {
        if (this.isSubmitting || !this._validate()) return;
        this.isSubmitting = true;

        this._cartService.checkout(this.form)
        .subscribe({
            next: (res: any) => {
                this.isSubmitting = false;
                localStorage.removeItem('carts');
                this._headerService.updateCart(0);

                setTimeout(() => this._router.navigate(['/order'], { queryParams: {order_id: res.order_id }}), 600);
            },
            error: (err: any) => {
                this.isSubmitting = false;
                let errorMessage = 'Gagal memproses pesanan'
				if (err.error && err.error.message) errorMessage = err.error.message
				this._toastrService.error(errorMessage, 'Error')
            }
        })
    }
}
