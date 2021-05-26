import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorsComponent } from './components/colors/colors.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { WaitingComponent } from './components/waiting/waiting.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';
import { CardMaskPipe } from './pipes/card-mask.pipe';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorsComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    FilterBrandPipe,
    FilterColorPipe,
    FilterCarPipe,
    CarDetailComponent,
    WaitingComponent,
    NavbarComponent,
    CarRentalComponent,
    CardMaskPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
