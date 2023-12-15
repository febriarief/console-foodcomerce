import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common'
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './client/views/default-layout/pages';
import { FooterComponent, HeaderComponent } from './client/views/default-layout/components'; 
import { HeaderService } from './client/views/default-layout/services';
import { DefaultLayoutComponent as AdminDefaultLayoutComponent, HeaderComponent as AdminHeaderComponent, SidebarComponent } from './admin/views/default-layout';
import { CoreModule } from './core/core.module';
import { AuthGuard, AuthService as AdminAuthService } from './admin/views/login/services';

const ROUTES: Routes = [
    // Client 
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./admin/views/login/login.module').then((m) => m.LoginModule) },
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            { path: 'home', loadChildren: () => import('./client/views/home/home.module').then((m) => m.HomeModule) },
            { path: 'cart', loadChildren: () => import('./client/views/cart/cart.module').then((m) => m.CartModule) },
            { path: 'order', loadChildren: () => import('./client/views/order/order.module').then((m) => m.OrderModule) },
        ]
    },
    
    // Admin
    { path: 'admin', redirectTo: '/admin/products', pathMatch: 'full' },
    {
        path: 'admin',
        component: AdminDefaultLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', loadChildren: () => import('./admin/views/dashboard/dashboard.module').then((m) => m.DashboardModule) },
            { path: 'products', loadChildren: () => import('./admin/views/products/products.module').then((m) => m.ProductsModule) },
            { path: 'orders', loadChildren: () => import('./admin/views/orders/orders.module').then((m) => m.OrdersModule) }
        ]
    }
];


@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(ROUTES),
        ToastrModule.forRoot()
    ],
    
    bootstrap: [
        AppComponent
    ],

    declarations: [
        AdminDefaultLayoutComponent,
        AdminHeaderComponent,
        AppComponent,
        DefaultLayoutComponent,
        FooterComponent,
        HeaderComponent,
        SidebarComponent
    ],
    
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        AdminAuthService,
        AuthGuard,
        HeaderService
    ]

})
export class AppModule { }
