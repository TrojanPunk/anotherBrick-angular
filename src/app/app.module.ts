import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from '../shared/components/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material/material.module';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { PropertyDisplayComponent } from './property-display/property-display.component';
import { SellerCardsComponent } from '../shared/components/seller-cards/seller-cards.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { LogoutDialogComponent } from '../shared/components/logout-dialog/logout-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SignupComponent,
    SigninComponent,
    NavbarComponent,
    BuyerComponent,
    SellerComponent,
    AdminComponent,
    HomeComponent,
    CardComponent,
    FilterDialogComponent,
    PropertyDisplayComponent,
    SellerCardsComponent,
    LandingPageComponent,
    WishlistComponent,
    FooterComponent,
    LogoutDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
