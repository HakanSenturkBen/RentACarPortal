import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';
import { CarComponent } from './components/car/car.component';
import { DataProcessorComponent } from './components/data-processor/data-processor.component';


const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"detail/:carId",component:CarDetailComponent},
  {path:"carrental/:carId",component:CarRentalComponent},
  {path:"dataprocessor",component:DataProcessorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
