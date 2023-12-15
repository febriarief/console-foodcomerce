import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '../../login/services';
import { ToastrService } from 'ngx-toastr';
import { environment } from '~/environments/environment';

@Component({
    selector: 'admin-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent
{
    private _isSidebarCollapsed: boolean;

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _authService: AuthService,
        private _toastrService: ToastrService,
    ) {
        this._isSidebarCollapsed = false;
    }

    toggleSidebar(): void {
        this._isSidebarCollapsed = !this._isSidebarCollapsed;
        const body = this._document.body;
        body.classList.toggle('sidebar-icon-only', this._isSidebarCollapsed);
    }

    logout(): void {
        this._authService.logout()
        .subscribe({
            next: () => {
                window.location.href = '/#/login';
            },
            error: (err: any) => {
                let errorMessage = 'Gagal memproses data'
				if (err.error && err.error.message) errorMessage = err.error.message
				this._toastrService.error(errorMessage, 'Error')
            }
        })
    }
}
