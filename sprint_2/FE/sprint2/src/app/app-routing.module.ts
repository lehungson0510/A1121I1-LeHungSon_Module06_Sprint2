import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './book/home/home.component';
import {DetailComponent} from './book/detail/detail.component';
import {LoginComponent} from './book/login/login.component';
import {CartComponent} from './book/cart/cart.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
