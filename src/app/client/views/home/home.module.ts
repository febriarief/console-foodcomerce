import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages';
import { SharedModule } from '../../shared/shared.module';


const ROUTES: Routes = [
    { path: '', component: HomeComponent }
];

// const COMPONENTS = [

// ];

const PAGES = [
    HomeComponent
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

    ],

    schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
	]
})

export class HomeModule {}
