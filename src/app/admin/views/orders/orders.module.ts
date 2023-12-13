import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { OrdersComponent } from './pages';
import { OrderService } from './services';


const ROUTES: Routes = [
    { path: '', component: OrdersComponent }
];

// const COMPONENTS = [

// ];

const PAGES = [
    OrdersComponent
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
        OrderService
    ],

    schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
	]
})

export class OrdersModule {}
