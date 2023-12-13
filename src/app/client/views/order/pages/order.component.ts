import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { OrderService } from "../services";
import { ToastrService } from "ngx-toastr";
import { environment } from "~/environments/environment";

@Component({
    selector: 'client-order',
    templateUrl: './order.component.html',
})

export class OrderComponent implements OnInit
{
    public orderId!: string;
    public order: any;
    public details: any;
    public loadingData!: boolean;
    public webUrl: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _toastrService: ToastrService,
        private _orderService: OrderService,
    ) {
        this.webUrl = environment.webUrl;
        
        this.order = {};
        this.details = [];
    }

    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     * 
     * @returns void
     */
    ngOnInit(): void {
        this._activatedRoute.params.subscribe((params: Params) => this.loadData(params['order_id']));
    }

    loadData(order_id: string): void {
        this.loadingData = true;

        this._orderService.get({ order_id })
        .subscribe({
            next: (res: any) => {
                this.loadingData = false;
                this.order = res;
                this.details = res.detail
            },
            error: (err: any) => {
                this.loadingData = false;
                let errorMessage = 'Gagal memuat data'
				if (err.error && err.error.message) errorMessage = err.error.message
				this._toastrService.error(errorMessage, 'Error')
            }
        })
    }
}
