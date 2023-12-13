import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CoreModule } from "~/app/core/core.module";
import { ModalService } from "./services";
import { AppDialogComponent } from "./components";
import { ProductService } from "../views/home/services";



@NgModule({
	imports: [
        CoreModule
	],

	exports: [
        AppDialogComponent,
        CoreModule
	],

	declarations: [
        AppDialogComponent
    ],

	providers: [
        ModalService,
        ProductService
    ],

	schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
	]
})

export class SharedModule { }
