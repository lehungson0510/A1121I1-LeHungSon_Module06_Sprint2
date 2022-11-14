import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HomeComponent} from './book/home/home.component';
import {DetailComponent} from './book/detail/detail.component';
import {LoginComponent} from './book/login/login.component';
import {CartComponent} from './book/cart/cart.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {ErrorComponent} from './error/error.component';
import {ListCategoryComponent} from './book/list-category/list-category.component';
import {APP_BASE_HREF} from '@angular/common';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {ReactiveFormsModule} from '@angular/forms';
import { SaleSpecialComponent } from './book/sale-special/sale-special.component';

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
    SaleSpecialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [ authInterceptorProviders,
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
