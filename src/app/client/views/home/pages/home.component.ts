import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from '../../default-layout/services';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services';
import { environment } from '~/environments/environment';

@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit
{
    @ViewChild('itemDetailModal') public itemDetailModal!: TemplateRef<any>;
    
    public products: any;
    public bsModalRef!: BsModalRef;
    public itemDetail: any;
    public isSubmitting: boolean;
    public loadingData!: boolean;
    public webUrl: string;

    constructor(
        private _bsModalService: BsModalService,
        private _headerService: HeaderService,
        private _productService: ProductService,
        private _router: Router,
        private _title: Title,
        private _toastrService: ToastrService,
    ) {
        _title.setTitle('Beranda | Dapuremaqu');

        this.products = [];
        this.isSubmitting = false;
        this.webUrl = environment.webUrl;
    }

    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     */
    ngOnInit(): void {
        this.clearItemDetail();
        this.loadData();
    }

    loadData(): void {
        this.loadingData = true;

        this._productService.get()
        .subscribe({
            next: (res: any) => {
                this.loadingData = false;
                this.products = res;
            },
            error: (err: any) => {
                this.loadingData = false;
                let errorMessage = 'Gagal memuat data'
				if (err.error && err.error.message) errorMessage = err.error.message
				this._toastrService.error(errorMessage, 'Error')
            }
        })
    }

    clearItemDetail(): void {
        this.itemDetail = {
            id_produk: null,
            nama_produk: null,
            keterangan: null,
            harga: null,
            gambar: null,
            qty: 1,
        }
    }

    viewItemDetail(product: any): void {
        this.itemDetail = { ...product, qty: 1 };
        setTimeout(() => this._openform(this.itemDetailModal));
    }
    
    plusItem(): void {
        this.itemDetail.qty++;
    }

    minusItem(): void {
        this.itemDetail.qty--;
    }

    addToCart(): void {
        let currCart: any[] = [];
        const carts = localStorage.getItem('carts');
        if (carts) {
            currCart = JSON.parse(carts);
            const findItemIndex = currCart.findIndex((obj) => Number(obj.id_produk) === Number(this.itemDetail.id_produk));
            if (findItemIndex >= 0) {
                currCart[findItemIndex].qty += this.itemDetail.qty;
            } else {
                currCart.push(this.itemDetail);
            }
        } else {
            currCart.push(this.itemDetail);
        }

        const totalQty = currCart.reduce((accumulator, currentItem) => accumulator + currentItem.qty, 0);
        this._headerService.updateCart(totalQty);

        localStorage.setItem('carts', JSON.stringify(currCart));
        this.closeModal();

        this._toastrService.success('Produk berhasil ditambahkan ke keranjang');
    }

    /**
     * Opens a modal form for creating or editing data.
     * Initializes the form, clears any previous form data and validation messages,
     * and displays the modal dialog.
     * 
     * @returns void
     */
    private _openform(template: any, modalOptions?: any): void {
        // this.clearFormValidation();

        if (!modalOptions) {
            modalOptions = { 
                // class: 'modal-xl',
                ignoreBackdropClick: false
            };
        }

        this.bsModalRef = this._bsModalService.show(template, modalOptions);
    }

    /**
     * Closes the currently open modal.
     * 
     * @returns void
     */
	closeModal(): void {
        this.bsModalRef?.hide();
        setTimeout(() => this.clearItemDetail(), 600);
	}
}
