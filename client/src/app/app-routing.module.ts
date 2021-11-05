import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookdetailComponent } from './components/bookdetail/bookdetail.component';
import { HomeComponent } from './components/home/home.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Bookdetail', component: BookdetailComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
