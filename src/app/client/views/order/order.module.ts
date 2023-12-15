import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './pages';
import { SharedModule } from '../../shared/shared.module';
import { OrderService } from './services';


const ROUTES: Routes = [
    { path: '', component: OrderComponent }
];

// const COMPONENTS = [

// ];

const PAGES = [
    OrderComponent
];


@NgModule({
	imports: [
		RouterModule.forChild(ROUTES),
        SharedModule,
	],

	exports: [
		RouterModule
	],

  	declarations: [
        // ...COMPONENTS,
        ...PAGES
	],

	providers: [
        OrderService
    ],

    schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
	]
})

export class OrderModule {}
