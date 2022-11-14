import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './book/home/home.component';
import {DetailComponent} from './book/detail/detail.component';
import {LoginComponent} from './book/login/login.component';
import {CartComponent} from './book/cart/cart.component';
import {ErrorComponent} from './error/error.component';
import {ListCategoryComponent} from './book/list-category/list-category.component';
import {SaleSpecialComponent} from './book/sale-special/sale-special.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error404', component: ErrorComponent},
  {path: 'list-category/:id/:name', component: ListCategoryComponent},
  {path: 'sale-special', component: SaleSpecialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
