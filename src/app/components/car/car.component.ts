import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';

import { CarService } from 'src/app/services/car.service';
import { ColorsService } from 'src/app/services/colors.service';
import { BrandModel } from '../brand/brandModel';
import { ColorModel } from '../colors/colors';
import { CarInfoModel } from './carInfoModel';
import { CarModel } from './carModel';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  dataLoaded = false;
  filterText = "";
  colorFilter = "";
  cars: CarModel[] = [];
  brands: BrandModel[] = [];
  colors: ColorModel[] = [];
  carbyInfos: CarInfoModel[] = [];

  constructor(private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorsService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
      this.getCarByInfos()
      this.getBrands();
      this.getColors();

    
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });

  }
  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }


  getCarByInfos() {
    this.carService.getCarInfo().subscribe(response => {
      this.carbyInfos = response.data;
      this.dataLoaded = true;
    });
  }
  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      console.log(this.cars)
    });
  }

  reDirection(currentCar: CarInfoModel) {
    let carId = currentCar.carId
    this.router.navigate(["detail/" + carId])
  }


}
