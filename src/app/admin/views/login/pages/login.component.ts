import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../services";

@Component({
    selector: 'admin-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit
{
    public form!: any;
    public isSubmit!: boolean;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _toastrService: ToastrService,
    ) {

    }

    ngOnInit(): void {
        this.clearForm();
    }

    clearForm(): void {
        this.form = {
            username: null,
            password: null
        };
    }

    private _validate(): boolean {
        if (!this.form.username) {
            this._toastrService.error('Kolom isian nama pengguna tidak boleh kosong');
            return false;
        }

        if (!this.form.password) {
            this._toastrService.error('Kolom isian kata sandi tidak boleh kosong');
            return false;
        }

        return true;
    }

    signIn(): void {
        if (this.isSubmit || !this._validate()) return;
        this.isSubmit = true;

        this._authService.login(this.form)
        .subscribe({
            next: () => {
                this.isSubmit = false
                this._router.navigate(['admin']);
            },
            error: (err: any) => {
                console.log(err)
                this.isSubmit = false;
                let errorMessage = 'Gagal memproses data'
				if (err.error && err.error.message) errorMessage = err.error.message
				this._toastrService.error(errorMessage, 'Error')
            }
        })
    }
}
