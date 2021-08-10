import { LoginGuard } from './quards/login.guard';
import { MapsComponent } from './components/maps/maps.component';
import { InceptionComponent } from './components/inception/inception.component';
import { MembershipComponent } from './components/membership/membership.component';
import { FindeksComponent } from './components/findeks/findeks.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';
import { CarComponent } from './components/car/car.component';
import { DataProcessorComponent } from './components/data-processor/data-processor.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerComponent } from './components/customer/customer.component';



const routes: Routes = [
  {path:"",pathMatch:"full",component:InceptionComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"detail/:carId",component:CarDetailComponent},
  {path:"carrental/:carId",component:CarRentalComponent},
  {path:"dataprocessor",component:DataProcessorComponent},
  {path:"register",component:RegisterComponent},
  {path:"findex",component:FindeksComponent},
  {path:"membership",component:MembershipComponent},
  {path:"customers",component:CustomerComponent},
  {path:"login",component:LoginComponent},
  {path:"cars",component:CarComponent, canActivate:[LoginGuard]},
  {path:"maps",component:MapsComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
