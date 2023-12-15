import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from '~/app/admin/shared/services';
import { ProductService } from '../services';
import { ToastrService } from 'ngx-toastr';
import { environment } from '~/environments/environment';

@Component({
    templateUrl: 'products.component.html'
})

export class ProductsComponent implements OnInit
{
    @ViewChild('formModal') public formModal!: TemplateRef<any>;
    
    public loadingData!: boolean;
    public products: any;
    public bsModalRef: BsModalRef | undefined;
    public formTitle: string;
    public form: any;
    public formValidation: any;
    public editMode: boolean;
    public isSubmitting: boolean;
    public file: File | null = null;
    public webUrl: string;
    public productImage!: string|null;

    constructor(
        private _bsModalService: BsModalService,
        private _modalService: ModalService,
        private _productService: ProductService,
        private _title: Title,
        private _toastrService: ToastrService,
    ) {
        this._title.setTitle('Produk | Admin Console');
        this.formTitle = 'Tambah Data Produk';
        this.products = [];
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

    loadData(page = 1): void {
        this.loadingData = true;

        this._productService.get({ page })
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

    /**
	 * Reset value of object form before making a request
	 * to add resources.
	 *
	 * @return void
	 */
	clearForm(): void {
		this.form = {
            nama_produk: null,
            keterangan: null,
            gambar: null,
            harga: null
        }
	}

    /**
     * Initiates the process of creating new data by displaying a modal form.
     * 
     * @returns void
     */
    createData(): void {   
        this.clearForm();
             
        this.formTitle = 'Tambah Data Produk';
        this.editMode = false;

        this._openform();
    }

    /**
     * Initiates the process of editing existing data by displaying a modal form.
     *
     * @param entry - The data entry to be edited.
     * @returns void
     */
    editData(entry: any): void {
        this.formTitle = 'Ubah Data Produk'
        this.editMode = true
        this.form = { ...this.form, ...entry }
        this.productImage = `${this.webUrl}/images/${this.form.gambar}`
        
        this._openform()
    }

    /**
     * Opens a modal form for creating or editing data.
     * Initializes the form, clears any previous form data and validation messages,
     * and displays the modal dialog.
     * 
     * @returns void
     */
    private _openform(): void {
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
        setTimeout(() => this.productImage = null, 600);
	}

    onChange(event: any) {
        const file: File = event.target.files[0];
        if (file) this.form.gambar = file;
    }

    private _validate(): boolean {
        if (!this.form.nama_produk) {
            this._toastrService.error('Kolom isian nama produk tidak boleh kosong');
            return false;
        }

        if (!this.form.keterangan) {
            this._toastrService.error('Kolom isian keterangan tidak boleh kosong');
            return false;
        }

        if (!this.form.gambar) {
            this._toastrService.error('Kolom isian gambar tidak boleh kosong');
            return false;
        }

        if (!this.form.harga) {
            this._toastrService.error('Kolom isian harga tidak boleh kosong');
            return false;
        }

        return true;
    }

    save(): void {
        if (this.isSubmitting || !this._validate()) return;
        this.isSubmitting = true;

        if (this.editMode) {
            this._productService.update(this.form, this.form.id_produk)
            .subscribe({
                next: () => {
                    this.isSubmitting = false
                    this._toastrService.success('Data berhasil disimpan');
                    this.loadData()
                    this.closeForm();
                },
                error: (err: any) => {
                    this.isSubmitting = false;
                    let errorMessage = 'Gagal menyimpan data'
                    if (err.error && err.error.message) errorMessage = err.error.message
                    this._toastrService.error(errorMessage, 'Error')
                }
            })
            return;
        }

        this._productService.store(this.form)
        .subscribe({
            next: () => {
                this.isSubmitting = false
                this._toastrService.success('Data berhasil disimpan');
                this.loadData()
                this.closeForm();
            },
            error: (err: any) => {
                this.isSubmitting = false;
                let errorMessage = 'Gagal menyimpan data'
				if (err.error && err.error.message) errorMessage = err.error.message
				this._toastrService.error(errorMessage, 'Error')
            }
        })
    }

    /**
     * Deletes a data entry based on the provided ID.
     *
     * @param id - The ID of the data entry to be deleted.
     * @returns void
     */
    deleteData(id: any): void {
        this._modalService.confirm('Apakah Anda yakin akan menghapus data ini?', 'Konfirmasi')
		.then((res: any) => {
            if (res) {
                this._productService.delete(this.form.id_produk)
                .subscribe({
                    next: () => {
                        this._toastrService.success('Data berhasil dihapus');
                        this.loadData()
                    },
                    error: (err: any) => {
                        let errorMessage = 'Gagal menghapus data'
                        if (err.error && err.error.message) errorMessage = err.error.message
                        this._toastrService.error(errorMessage, 'Error')
                    }
                })
            } 
		});
    }
}
