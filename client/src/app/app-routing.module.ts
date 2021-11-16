import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistPageComponent } from './pages/regist-page/regist-page.component';
import { AuthGuard } from './auth.guard';
import { BookdetailComponent } from './pages/home/bookdetail/bookdetail.component';
import { BooklistComponent } from './pages/home/booklist/booklist.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { InsertComponent } from './pages/admin-page/components/insert/insert.component';
import { DashboardComponent } from './pages/admin-page/components/dashboard/dashboard.component';

const routes: Routes = [
  // {path: '', component: HomeComponent},
  // {path: 'Bookdetail', component: BookdetailComponent},
  // {path: 'edit-profile', component: EditProfileComponent},
  // {path: 'cart', component: CartComponent}
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: BooklistComponent },
      { path: 'book/:productId', component: BookdetailComponent },
    ],
  },
  // { path: 'home/book/:productId', component: HomeComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home/login', component: LoginPageComponent },
  { path: 'home/register', component: RegistPageComponent },
  { path: 'admin', component: LoginAdminComponent },
  { path: 'admin/page', component: AdminPageComponent },
  { path: 'admin/insert', component: InsertComponent },
  { path: 'admin/dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
