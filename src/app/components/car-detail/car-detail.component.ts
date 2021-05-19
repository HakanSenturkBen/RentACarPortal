import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CarInfoModel } from '../car/carInfoModel';
import { CarImageModel } from './carImageModel';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages:CarImageModel[]=[];
  carModel:CarInfoModel;

  xRes:string;

  constructor(private activeRoute:ActivatedRoute,
    private carImage:CarImageService,
    private carService:CarService) { }

   
    
  ngOnInit(): void {
    let id:number;
    this.activeRoute.params.subscribe(params=>{
      id=(params["carId"]);
    });
    if(id==1){
      this.xRes="Bugatti";
    }else{this.xRes="Lamborghini";}
    
    this.getPaths(id);
    this.carService.getCarById(id).subscribe(resp=>{
      this.carModel=resp.data
    })
    
    
  }
  getPaths(id:number){
    this.carImage.getCarImagePaths(id).subscribe(response=>{
      this.carImages=response.data;
    });
  
  }


}
