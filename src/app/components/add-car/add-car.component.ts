import { CarModel } from './../car/carModel';
import { CarInfoModel } from './../car/carInfoModel';
import { ColorModel } from './../colors/colors';
import { BrandModel } from './../brand/brandModel';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { CarService } from 'src/app/services/car.service';
import { BrandService } from 'src/app/services/brand.service';
import { ColorsService } from 'src/app/services/colors.service';

@Component({
  selector: 'add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {



  constructor(private tools: ToolsService,
    private carService: CarService,
    private brand: BrandService,
    private color: ColorsService) { }

  brandlers: BrandModel[];
  colorlers: ColorModel[];
  carDetail: CarInfoModel = {
    carId: 0,
    brandName: "",
    colorName: "",
    dailyPrice: null,
    modelYear: "",
    description: "",
    createDate: null,
    active: true
  };

  @Output() childEvent = new EventEmitter();

  car: CarModel;


  ngOnInit(): void {

    this.brand.getBrands().subscribe(res => { this.brandlers = res.data; });
    this.color.getColors().subscribe(res => { this.colorlers = res.data; });

  }


  dataTrans(carid: number) {
    let colorID: number;
    let brandID: number;
    for (let color of this.colorlers) {
          if (color.colorName == this.carDetail.colorName) {
            colorID = color.id;
          }
    }
    for (let brand of this.brandlers) {
          if (brand.brandName == this.carDetail.brandName) {
            brandID = brand.id;
          }
    }
    let tarih = (this.carDetail.createDate.toString()).split("-", 3);
    let tarih1 = tarih[2] + "-" + tarih[1] + "-" + tarih[0]

    this.car = {
          id: carid,
          brandId: brandID,
          colorId: colorID,
          dailyPrice: this.carDetail.dailyPrice,
          modelYear: this.carDetail.modelYear,
          description: this.carDetail.description,
          createDate: tarih1,
          active: true
        }




  }

  saveCar(value: any) {

    this.dataTrans(0)

    this.carService.saveCar(this.car).subscribe(res => {
          this.tools.toastSuccess(res.message.toString(), "center-center")
    }, error => {
          this.tools.toastInfo(error.error.message, "bottom-right");
          for (var hata of error.error.Errors) {
                this.tools.toastInfo(hata.ErrorMessage, "bottom-right")
          }
    });

    this.modalClose(value)

  }

  modalClose(value: any) {
    this.onChange(value);
   
  }

  onChange(value: any) {
    this.childEvent.emit(value);
  }

  checkValue(){
    
    if(this.carDetail.dailyPrice<1750){
        this.carDetail.dailyPrice=null;
        this.tools.toastInfo("günlük kira için alt limit = 1750 TL","center-center");
        

    } else if(this.carDetail.dailyPrice>5500){
        this.carDetail.dailyPrice=null;
        this.tools.toastInfo("günlük kira için üst limit = 5500 TL","center-center");
    }

  }

}
