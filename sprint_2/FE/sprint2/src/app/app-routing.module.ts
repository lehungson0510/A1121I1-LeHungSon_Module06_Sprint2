import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './book/home/home.component';
import {DetailComponent} from './book/detail/detail.component';
import {LoginComponent} from './book/login/login.component';
import {CartComponent} from './book/cart/cart.component';
import {ErrorComponent} from './error/error.component';
import {ListCategoryComponent} from './book/list-category/list-category.component';
import {SaleSpecialComponent} from './book/sale-special/sale-special.component';
import {SearchBookComponent} from './book/search-book/search-book.component';
import {EditComponent} from './book/edit/edit.component';
import {AuthGuard} from './helpers/auth.guard';
import {BothAuthGuard} from './helpers/both-auth.guard';
import {BothAuthUserGuardAuth} from './helpers/both-auth-user.guard';
import {BookBestSellComponent} from './book/book-best-sell/book-best-sell.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard, BothAuthUserGuardAuth]},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error404', component: ErrorComponent},
  {path: 'list-category/:id/:name', component: ListCategoryComponent},
  {path: 'sale-special', component: SaleSpecialComponent},
  {path: 'search/:name', component: SearchBookComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'book-best-sell', component: BookBestSellComponent},
  {path: 'auth/access-denied', component: AccessDeniedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
