import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent
{
    constructor(
        private _title: Title,
    ) {
        this._title.setTitle('Dashboard | Admin Console')
    }
}
