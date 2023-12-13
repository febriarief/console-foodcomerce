import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './pages';


const ROUTES: Routes = [
    { path: '', component: ProductsComponent }
];

// const COMPONENTS = [

// ];

const PAGES = [
    ProductsComponent
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

export class ProductsModule {}
