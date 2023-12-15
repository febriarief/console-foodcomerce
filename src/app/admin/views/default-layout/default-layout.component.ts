import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'admin-default-layout',
    templateUrl: 'default-layout.component.html',
})

export class DefaultLayoutComponent implements OnInit
{
    constructor(
        @Inject(DOCUMENT) private _document: Document
    ) {
        this._document.getElementById('app-favicon')?.setAttribute('href', 'assets/images/admin/favicon.png');
    }

    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     */
    ngOnInit(): void {

    }
}
