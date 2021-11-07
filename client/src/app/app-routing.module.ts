import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistPageComponent } from './pages/regist-page/regist-page.component';

const routes: Routes = [
  // {path: '', component: HomeComponent},
  // {path: 'Bookdetail', component: BookdetailComponent},
  // {path: 'edit-profile', component: EditProfileComponent},
  // {path: 'cart', component: CartComponent}
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'home/book/:productId', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegistPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
