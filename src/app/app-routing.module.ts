import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { HomeComponent } from './home/home.component';
import { PropertyDisplayComponent } from './property-display/property-display.component';

const routes: Routes = [
  {
    path: "", redirectTo: "",
    pathMatch: "full"
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "admin/:id",
    component: AdminComponent
  },
  {
    path: "buyer/:id",
    component: BuyerComponent
  },
  {
    path: "seller/:id",
    component: SellerComponent
  },
  {
    path: "property/:id",
    component: PropertyDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
