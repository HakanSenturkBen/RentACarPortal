import { AuthInterceptor } from './interceptors/auth.interceptor';
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
import { DataProcessorComponent } from './components/data-processor/data-processor.component';
import { CarDataComponent } from './components/car-data/car-data.component';
import { MapsComponent } from './components/maps/maps.component';
import { DialogBoxingComponent } from './components/dialog-boxing/dialog-boxing.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { ColorDataComponent } from './components/color-data/color-data.component';
import { BrandDataComponent } from './components/brand-data/brand-data.component';
import { FindeksComponent } from './components/findeks/findeks.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MembershipComponent } from './components/membership/membership.component';
import { InceptionComponent } from './components/inception/inception.component';
import { RentalDirective } from './directive/rental.directive';
import { AngularTiltModule } from 'angular-tilt';





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
    CardMaskPipe,
    DataProcessorComponent,
    CarDataComponent,
    MapsComponent,
    DialogBoxingComponent,
    AddCarComponent,
    AddBrandComponent,
    AddColorComponent,
    AddImageComponent,
    ColorDataComponent,
    BrandDataComponent,
    FindeksComponent,
    RegisterComponent,
    LoginComponent,
    MembershipComponent,
    InceptionComponent,
    RentalDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AngularTiltModule
    
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
