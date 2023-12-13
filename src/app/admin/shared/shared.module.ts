import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CoreModule } from "~/app/core/core.module";
import { ExtendedHttpInterceptor, ModalService } from "./services";
import { AppDialogComponent } from "./components";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "../views/login/services";



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
        AuthService,
        ModalService
    ],

	schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
	]
})

export class SharedModule { }
