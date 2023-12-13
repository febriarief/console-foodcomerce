import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services';
import { Router } from '@angular/router';
import { environment } from '~/environments/environment';

@Component({
    selector: 'client-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit
{
    public totalQtyCart: number;
    public carts: any[];
    public webUrl: string;

    constructor(
        private _headerService: HeaderService,
        private _router: Router
    ) {
        this.totalQtyCart = 0;
        this.carts = [];
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
        this._getCartItem();
        this.totalQtyCart = this.carts.reduce((accumulator, currentItem) => accumulator + currentItem.qty, 0);
        
        this._headerService.getCartObservable()
        .subscribe({
            next: (qty: number) => {
                this.totalQtyCart = qty;
                setTimeout(() => this._getCartItem(), 600);
            }
        });
    }

    openTracking(): void {
        this._headerService.openTrackingModal();
    }

    deleteItem(id: number): void {
        const itemIndex = this.carts.findIndex((obj) => obj.id_produk === id);
        if (itemIndex !== -1) {
            this.carts.splice(itemIndex, 1);
            this.totalQtyCart = this.carts.reduce((accumulator, currentItem) => accumulator + currentItem.qty, 0);
            localStorage.setItem('carts', JSON.stringify(this.carts));
        }
    }

    private _getCartItem(): void {
        const carts = localStorage.getItem('carts');
        if (carts) this.carts = JSON.parse(carts);
    }

    checkout(): void {
        this._router.navigate(['/cart']);
    }
}
