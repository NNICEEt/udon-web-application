import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule} from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import {MatTableModule} from '@angular/material/table';

import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './pages/home/banner/banner.component';
import { ContactComponent } from './components/contact/contact.component';
import { PanelComponent } from './pages/home/panel/panel.component';
import { CartPanelComponent } from './pages/cart/cart-panel/cart-panel.component';
import { AddressPanelComponent } from './pages/cart/address-panel/address-panel.component';
import { ProfilePanelComponent } from './pages/profile/profile-panel/profile-panel.component';
import { CounterComponent } from './components/counter/counter.component';
import { BooklistComponent } from './pages/home/booklist/booklist.component';
import { InformationBoxComponent } from './pages/profile/information-box/information-box.component';
import { SecureBoxComponent } from './pages/profile/secure-box/secure-box.component';
import { MyorderBoxComponent } from './pages/profile/myorder-box/myorder-box.component';
import { ProductPanelComponent } from './pages/cart/cart-panel/product-panel/product-panel.component';
import { SummaryPanelComponent } from './pages/cart/cart-panel/summary-panel/summary-panel.component';
import { BookdetailComponent } from './pages/home/bookdetail/bookdetail.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistPageComponent } from './pages/regist-page/regist-page.component';

@NgModule({

  declarations: [
    // AppComponent,
    // NavbarComponent,
    // BannerComponent,
    // CategoryComponent,
    // ContactComponent,
    // HomeComponent,
    // CartComponent,
    // ProfileComponent
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    HomeComponent,
    CartComponent,
    BannerComponent,
    ContactComponent,
    PanelComponent,
    CartPanelComponent,
    AddressPanelComponent,
    ProfilePanelComponent,
    CounterComponent,
    BooklistComponent,
    InformationBoxComponent,
    SecureBoxComponent,
    MyorderBoxComponent,
    ProductPanelComponent,
    SummaryPanelComponent,
    BookdetailComponent,
    LoginPageComponent,
    RegistPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FontAwesomeModule,
    MatBadgeModule,
    MatDividerModule,
    MatCardModule,
    HttpClientModule,
    MatMenuModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
