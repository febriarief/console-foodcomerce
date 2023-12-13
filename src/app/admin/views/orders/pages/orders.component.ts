import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from '~/app/admin/shared/services';
import { OrderService } from '../services';
import { ToastrService } from 'ngx-toastr';
import { environment } from '~/environments/environment';

@Component({
    templateUrl: 'orders.component.html'
})

export class OrdersComponent implements OnInit
{
    @ViewChild('formModal') public formModal!: TemplateRef<any>;
    
    public orders: any;
    public bsModalRef: BsModalRef | undefined;
    public detailTitle!: string;
    public dataOrder: any;
    public orderDetail: any;
    public formValidation: any;
    public editMode: boolean;
    public isSubmitting: boolean;
    public loadingData!: boolean;
    public webUrl: string;

    constructor(
        private _bsModalService: BsModalService,
        private _modalService: ModalService,
        private _orderService: OrderService,
        private _title: Title,
        private _toastrService: ToastrService,
    ) {
        this._title.setTitle('Pesanan | Admin Console');
        this.orders = [];
        this.editMode = false;
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
        this.loadData();
    }

    loadData(): void {
        this.loadingData = true;

        this._orderService.get()
        .subscribe({
            next: (res: any) => {
                this.loadingData = false;
                this.orders = res;
            },
            error: (err: any) => {
                this.loadingData = false;
                let errorMessage = 'Gagal memuat data'
				if (err.error && err.error.message) errorMessage = err.error.message
				this._toastrService.error(errorMessage, 'Error')
            }
        })
    }

    /**
	 * Reset value of object form before making a request
	 * to add resources.
	 *
	 * @return void
	 */
	clearForm(): void {
        this.dataOrder = {
            alamat: null,
            email: null,
            id_pesanan: null,
            nama_pelanggan: null,
            nomor_hp: null,
            status: null,
            tanggal_pesanan: null,
            total: null,
        };

		this.orderDetail = [];
	}

    /**
	 * Reset value of object form before making a request
	 * to add resources.
	 *
	 * @return void
	 */
	clearFormValidation(): void {
		this.formValidation = {
            name: { valid: true, message: null },
            unit_id: { valid: true, message: null },
            price: { valid: true, message: null }
        }
	}

    /**
     * Displays a modal form in read-only view mode to show the details of a data entry.
     *
     * @param entry - The data entry to be viewed.
     * @returns void
     */
    viewData(entry: any): void {
        this.detailTitle = 'Lihat Data Pesanan';
        this.dataOrder = { ...entry };
        this.orderDetail = [ ...entry.detail ];
        this._openform();
    }

    /**
     * Opens a modal form for creating or editing data.
     * Initializes the form, clears any previous form data and validation messages,
     * and displays the modal dialog.
     * 
     * @returns void
     */
    private _openform(): void {
        this.clearFormValidation();

        this.bsModalRef = this._bsModalService.show(this.formModal, { 
            class: 'modal-xl',
            ignoreBackdropClick: true
        });
    }

    /**
     * Closes the currently open modal.
     * 
     * @returns void
     */
	closeForm(): void {
        this.bsModalRef?.hide();
	}

    process(id: string): void {
        this._orderService.process(id)
        .subscribe({
            next: (res: any) => {
                this.loadData();
            },
            error: (err: any) => {
                let errorMessage = 'Gagal memproses data'
				if (err.error && err.error.message) errorMessage = err.error.message
				this._toastrService.error(errorMessage, 'Error')
            }
        })
    }

    finish(id: string): void {
        this._orderService.finish(id)
        .subscribe({
            next: (res: any) => {
                this.loadData();
            },
            error: (err: any) => {
                let errorMessage = 'Gagal memproses data'
				if (err.error && err.error.message) errorMessage = err.error.message
				this._toastrService.error(errorMessage, 'Error')
            }
        })
    }
}
