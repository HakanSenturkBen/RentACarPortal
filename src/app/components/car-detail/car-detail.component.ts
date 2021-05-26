import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToolsService } from 'src/app/services/tools.service';
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
  dataLoaded=false;

  xRes:string;

  constructor(private activeRoute:ActivatedRoute,
    private carImage:CarImageService,
    private carService:CarService,
    private rentalService:RentalService,
    private tools:ToolsService) { }

   
    
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
    });
    
  }

  isTheCarAvaible(){
    let id:number;
    this.activeRoute.params.subscribe(params=>{
      id=(params["carId"]);});
    this.rentalService.getRentalsDtoByCarId(id).subscribe(response=>{
      console.log(response.message)
      if(response.message=="uygun"){
        this.tools.toastInfo("kiralama için uygun","top-center")
        let carId=id
        this.tools.reDirection("carrental/"+carId)
        
      }
    },error=>{this.tools.toastInfo("araç şu an kirada","top-center")})
    
  }  

  getPaths(id:number){
    
    this.carImage.getCarImagePaths(id).subscribe(response=>{
      this.carImages=response.data;
      this.dataLoaded=true;
    });
  
  }


}
