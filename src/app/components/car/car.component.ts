import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

import { CarService } from 'src/app/services/car.service';
import { CarInfoModel } from './carInfoModel';
import { CarModel } from './carModel';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  dataLoaded=false;
  filterText="";
  cars:CarModel[]=[];
  carbyInfos:CarInfoModel[]=[];

  constructor(private carService:CarService,
     private activateRoute:ActivatedRoute,
     private router:Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      if (params["brandId"]){
        this.getCarsbyBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])

      }else{
        this.getCarByInfos()
      }
      

    });
    
  }
  getCarsByColor(id:number){
    this.carService.getCarsByColor(id).subscribe(response=>{
      this.carbyInfos=response.data;
      this.dataLoaded=true;
    });
  }

  getCarsbyBrand(id:number){
    this.carService.getCarsByBrand(id).subscribe(response=>{
      this.carbyInfos=response.data;
      this.dataLoaded=true;
    });

  }

  getCarByInfos(){
    this.carService.getCarInfo().subscribe(response=>{
      this.carbyInfos=response.data;
      this.dataLoaded=true;
    });
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      console.log(this.cars)
    });
  }

  reDirection(currentCar:CarInfoModel){
    let carId=currentCar.carId
    this.router.navigate(["detail/"+carId])
  }


}
