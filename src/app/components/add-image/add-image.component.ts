import { CarImageService } from 'src/app/services/car-image.service';
import { CarImageModel } from './../car-detail/carImageModel';
import { CarInfoModel } from './../car/carInfoModel';
import { CarService } from './../../services/car.service';
import { ToolsService } from './../../services/tools.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {


  @Output() childEvent = new EventEmitter();

  @ViewChild('imgRenderer') imgRenderer: ElementRef;

  carList:CarInfoModel[]=[]
  carId:number;
  currentCar:CarInfoModel;

  constructor( private tools:ToolsService,
    private carService:CarService,
    private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.carService.getCarInfo().subscribe(res=>{
      this.carList=res.data
    });

  }

  onChange(value: any) {
    this.childEvent.emit(value);
  }
  onPaste(event: any) {
    const items = event.clipboardData.items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }

    // load image if there is a pasted image
    if (blob !== null) {


      const fileFromBlob: File = new File([blob], '../assets/your-filename.jpg');
      console.log(fileFromBlob);

      const reader = new FileReader();
      reader.onload = (evt: any) => {
        console.log("burası", this.imgRenderer.nativeElement.src); // data url!
        this.imgRenderer.nativeElement.src = evt.target.result;
        this.tools.toastSuccess("buralar çalışıyor mu","center-center");
      };
      reader.readAsDataURL(blob);
    }
  }

  choice(p:any){
    let car=p.target.value;
    this.currentCar=JSON.parse(car);
  }

  savePaths()  {
     for (let index = 1; index <6; index++) {
       let image:CarImageModel={
             id: 0,
             carId: this.currentCar.carId,
             imagePath: "./assets/"+this.currentCar.brandName+"0"+index+".png",
             date: new Date()};  
       
       this.carImageService.addCarImagePaths(image).subscribe(res=>{
               this.tools.toastSuccess(this.currentCar.brandName+res.message,"center-center");
       });
    }
  }

}
