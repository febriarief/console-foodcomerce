import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HeaderService } from '../services';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: 'default-layout.component.html',
    styleUrls: ["../../../../../assets/css/client/theme.css"],
    encapsulation: ViewEncapsulation.None
})

export class DefaultLayoutComponent implements OnInit
{
    @ViewChild('trackingModal') public trackingModal!: TemplateRef<any>;
    
    public bsModalRef!: BsModalRef;
    public orderId!: string|null;

    constructor(
        private _bsModalService: BsModalService,
        private _headerService: HeaderService,
        private _router: Router,
        private _toastrService: ToastrService,
    ) {
        _router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                window.scrollTo({ left: 0, top: 0 })
            }
        });
    }

    ngOnInit(): void {
        this._headerService.getTrackingObservable()
        .subscribe({
            next: () => {
                this.openTracking();
            }
        });
    }

    openTracking(): void {
        this._openform(this.trackingModal, { class: 'modal-sm' });
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
	}

    trackOrder(): void {
        if (!this.orderId) {
            this._toastrService.error('Kolom isian nomor pesanan tidak boleh kosong.')
            return;
        }

        this.closeModal()
        setTimeout(() => {
            this._router.navigate(['/order', this.orderId])
            this.orderId = null;
        }, 600);
    }
}
