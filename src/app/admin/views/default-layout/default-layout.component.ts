import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'admin-default-layout',
    templateUrl: 'default-layout.component.html',
    styleUrls: [
        "../../../../assets/css/admin/feather.css",
        "../../../../assets/css/admin/themify-icons.css",
        "../../../../assets/css/admin/vendor.bundle.base.css",
        "../../../../assets/css/admin/style.css"
    ],
    encapsulation: ViewEncapsulation.None
})

export class DefaultLayoutComponent
{
    constructor(
        @Inject(DOCUMENT) private _document: Document
    ) {
        this._document.getElementById('app-favicon')?.setAttribute('href', 'assets/images/admin/favicon.png');
    }
}
