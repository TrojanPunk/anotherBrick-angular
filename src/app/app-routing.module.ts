import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { HomeComponent } from './home/home.component';
import { PropertyDisplayComponent } from './property-display/property-display.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "buyer/:id",
    component: BuyerComponent
  },
  {
    path: "seller",
    component: SellerComponent
  },
  {
    path: "home/property/:id",
    component: PropertyDisplayComponent
  },
  {
    path: "wishlist",
    component: WishlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
