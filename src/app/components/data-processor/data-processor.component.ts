import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorsService } from 'src/app/services/colors.service';
import { ToolsService } from 'src/app/services/tools.service';
import { BrandModel } from '../brand/brandModel';
import { CarInfoModel } from '../car/carInfoModel';
import { ColorModel } from '../colors/colors';


@Component({
  selector: 'data-processor',
  templateUrl: './data-processor.component.html',
  styleUrls: ['./data-processor.component.css']
})
export class DataProcessorComponent implements OnInit {


  brands: BrandModel[] = [];
  colors: ColorModel[] = [];
  cars: CarInfoModel[] = [];
  dataLoad = false;
  updateWindow = false;
  addCarWindow = false;
  addBrandWindow = false;
  addColorWindow = false;
  addImageWindow = false;
  updateBrandWindow = false;
  updateColorWindow = false;

  onUpdatedData: string;
  secim: string;
  public openDialog: string;

  changeCar: CarInfoModel;
  color: ColorModel;
  brand: BrandModel;


  carInfo: CarInfoModel = {
    carId: 0,
    brandName: "",
    colorName: "",
    modelYear: "",
    dailyPrice: 1750,
    description: "",
    createDate: null,
    active: true
  };



  constructor(private fb: FormBuilder,
    private tool: ToolsService,
    private car: CarService,
    private brandService: BrandService,
    private colorService: ColorsService) { }



  carInfoForm: FormGroup;

  ngOnInit(): void {
    this.car.getCarInfo().subscribe(res => { this.cars = res.data });
    this.brandService.getBrands().subscribe(res => { this.brands = res.data; });
    this.colorService.getColors().subscribe(res => {
      this.dataLoad = true;
      this.colors = res.data;
    });
    this.carInfoForm = this.fb.group({
      carId: ['', Validators.required],
      brandName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      colorName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
    })

  }

  getBrandWindow(brand: BrandModel) {
    this.brand = brand;
    this.dataLoad = false;
    this.updateBrandWindow = true;
  }

  getColorWindow(color: ColorModel) {
    this.color = color;
    this.dataLoad = false;
    this.updateColorWindow = true;
  }


  getCurrent(car: CarInfoModel) {
    this.changeCar = car;
    this.dataLoad = false;
    this.updateWindow = true;
  }

  onSubmit(carForm: any) {
    this.tool.toastSuccess("kaydet tuşuna basılı", "center-center")
  }

  public openDialogStatus(durum: string) {
    if (durum == '1') {

      switch (this.secim) {
        case "car":
          this.delete(this.changeCar);
          let carId: number = this.changeCar.carId;
          this.car.delCarById(carId).subscribe(res => {
            this.tool.toastWarning(res.message, "center-center");
          });
          this.tool.toastSuccess(this.changeCar.brandName + " markası için araç kaydı silme işlemi yapıldı", "bottom-center");
          break;

        case "brand":
          this.delBrand(this.brand);
          this.brandService.delBrand(this.brand).subscribe(res => {
            this.tool.toastWarning(res.message, "center-center");
          });
          this.tool.toastSuccess(this.brand.brandName + " markası için kayıt silme işlemi gerçekleşti :", "bottom-center");
          break;

        case "color":
          this.delColor(this.color);
          this.colorService.delColor(this.color).subscribe(res => {
            this.tool.toastWarning(res.message, "center-center");
          });
          this.tool.toastSuccess(this.color.colorName + " rengi için kayıt silme işlemi gerçekleşti :", "bottom-center");
          break;

        default:
          break;
      }



    } else {
      this.tool.toastSuccess("artık olay değişti", "bottom-right");
    }
    this.openDialog = null;
  }


  delColor(color: ColorModel) {
    this.color = color;
    this.secim = "color"
    this.openDialog = "0";


  }

  delBrand(brand: BrandModel) {
    this.brand = brand;
    this.secim = "brand"
    this.openDialog = "0";
  }

  delete(car: CarInfoModel) {
    this.changeCar = car;
    this.secim = "car";
    this.openDialog = "0";
  }

  addCar() {
    this.addCarWindow = true;
  }

  addBrand() {
    this.addBrandWindow = true;
  }

  addColor() {
    this.addColorWindow = true;
  }

  addImage() {
    this.addImageWindow = true;
  }

}