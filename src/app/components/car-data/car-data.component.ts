import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ToolsService } from 'src/app/services/tools.service';
import { BrandModel } from '../brand/brandModel';

import { CarInfoModel } from '../car/carInfoModel';
import { CarModel } from '../car/carModel';
import { ColorModel } from '../colors/colors';

@Component({
  selector: 'car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.css']
})
export class CarDataComponent implements OnInit {

  constructor(private tools:ToolsService,
    private carService:CarService) { }

  @Input() brandlist:BrandModel[];
  @Input() colorlist:ColorModel[];
  @Input() carDetail:CarInfoModel;
  
  car:CarModel;
  baslik:string;
  

  
  ngOnInit(): void {
    this.baslik=this.carDetail.brandName;
    let wait=this.baslik.split(" ",1);
    this.baslik=wait[0];
    console.log(this.colorlist)
    
  }
  log(x:any){
    if(this.carDetail.dailyPrice<1750)
    this.tools.toastSuccess("hahaha","center-center")
    console.log(x);
}


  dataTrans(carid:number){
    let colorID:number;
    let brandID:number;
    for (let color of this.colorlist) {
      if(color.colorName==this.carDetail.colorName){
        colorID=color.id;
      }
    }
    for(let brand of this.brandlist) {
      if(brand.brandName==this.carDetail.brandName){
        brandID=brand.id;
      }
    }
    this.car={id:carid,
      brandId:brandID,
      colorId:colorID,
      dailyPrice:this.carDetail.dailyPrice,
      modelYear:this.carDetail.modelYear,
      description:this.carDetail.description,
      createDate:"",
      active:true
    }



  }
  
  save(){
    
    this.dataTrans(0)
    
    this.carService.saveCar(this.car).subscribe(res=>{
      this.tools.toastSuccess(res.message.toString(),"center-center")
    });
  
  }
  
  update(){
    this.tools.toastInfo("bastın","center-center")
    this.dataTrans(this.carDetail.carId)
    this.carService.updateCar(this.car).subscribe(res=>{
      this.tools.toastSuccess(res.message.toString(),"center-center")
    });
    

  }

  delete(){
    this.tools.toastInfo("delete bastın","center-center")
    this.dataTrans(this.carDetail.carId)
    this.carService.delCar(this.car).subscribe(res=>{
      this.tools.toastSuccess(res.message.toString(),"center-center")
    });
  

  }

  modalClose(){
    
    this.tools.toastInfo("bir önceki sayfaya dönülüyor","center-center")
    this.tools.refreshPage();
    


  }
  
}
