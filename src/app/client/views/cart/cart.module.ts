import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages';
import { SharedModule } from '../../shared/shared.module';
import { CartService } from './services';


const ROUTES: Routes = [
    { path: '', component: CartComponent }
];

// const COMPONENTS = [

// ];

const PAGES = [
    CartComponent
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
        CartService
    ],

    schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
	]
})

export class CartModule {}
