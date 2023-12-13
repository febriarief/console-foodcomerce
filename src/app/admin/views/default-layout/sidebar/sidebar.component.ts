import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NAV_DATA } from '../nav';

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit
{
    public navData: any;

    constructor(

    ) {
        this.navData = NAV_DATA;
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
        
    }

    onHover(event: any): void {
        event.target.className += ' hover-open';
    }

    onHoverOut(event: any): void {
        event.target.className = event.target.className.replace(' hover-open', '');
    }
}
