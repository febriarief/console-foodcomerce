import { CommonModule, DecimalPipe } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from "ngx-bootstrap/modal";
import { LottieModule } from 'ngx-lottie';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import player from 'lottie-web';
import { NgxCurrencyDirective } from "ngx-currency";
import { RupiahDirective } from "./directives";
import { ExtendedHttpInterceptor as AdminExtendedHttpInterceptor } from "../admin/shared/services";
import { ProductService } from "../admin/views/products/services";

export function playerFactory() {
    return player;
}


@NgModule({
	imports: [
        BsDropdownModule.forRoot(),
		CommonModule,
		FormsModule,
		HttpClientModule,
        LottieModule.forRoot({ player: playerFactory }),
        ModalModule.forRoot(),
        NgxCurrencyDirective,
        NgxSkeletonLoaderModule
	],

	exports: [
        BsDropdownModule,
        CommonModule,
		FormsModule,
		HttpClientModule,
        LottieModule,
        ModalModule,
        NgxCurrencyDirective,
        NgxSkeletonLoaderModule,
        RupiahDirective
	],

	declarations: [
        RupiahDirective
    ],

	providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AdminExtendedHttpInterceptor,
            multi: true
        },
        DecimalPipe,
        ProductService
    ],

	schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
	]
})

export class CoreModule { }
