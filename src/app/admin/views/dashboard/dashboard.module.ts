import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './pages';


const ROUTES: Routes = [
    { path: '', component: DashboardComponent }
];

// const COMPONENTS = [

// ];

const PAGES = [
    DashboardComponent
];


@NgModule({
	imports: [
		RouterModule.forChild(ROUTES),
        SharedModule
	],

	exports: [
		RouterModule
	],

  	declarations: [
        // ...COMPONENTS,
        ...PAGES
	],

	providers: [

    ],

    schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
	]
})

export class DashboardModule {}
