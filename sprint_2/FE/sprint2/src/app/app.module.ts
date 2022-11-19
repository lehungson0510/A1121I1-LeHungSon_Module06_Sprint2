import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FooterComponent} from './layout/footer/footer.component';
import {DetailComponent} from './book/detail/detail.component';
import {LoginComponent} from './book/login/login.component';

import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {ErrorComponent} from './error/error.component';
import {ListCategoryComponent} from './book/list-category/list-category.component';
import {APP_BASE_HREF} from '@angular/common';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SaleSpecialComponent} from './book/sale-special/sale-special.component';
import {HeaderComponent} from './layout/header/header.component';
import {HomeComponent} from './book/home/home.component';
import {CartComponent} from './book/cart/cart.component';
import {EditComponent} from './book/edit/edit.component';
import {SearchBookComponent} from './book/search-book/search-book.component';
import { BookBestSellComponent } from './book/book-best-sell/book-best-sell.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DetailComponent,
    LoginComponent,
    CartComponent,
    ErrorComponent,
    ListCategoryComponent,
    SaleSpecialComponent,
    EditComponent,
    SearchBookComponent,
    BookBestSellComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [authInterceptorProviders,
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
