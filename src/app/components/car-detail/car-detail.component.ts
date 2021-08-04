import { CustomerService } from 'src/app/services/customer.service';
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

  public showFindex = false;
  public customerId: number = 0;
  carImages: CarImageModel[] = [];
  carModel: CarInfoModel;
  dataLoaded = false;


  xRes: string;


  constructor(private activeRoute: ActivatedRoute,
    private carImage: CarImageService,
    private carService: CarService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private tools: ToolsService) { }



  ngOnInit(): void {
    let id: number;
    this.activeRoute.params.subscribe(params => {
      id = (params["carId"]);
    });


    this.getPaths(id);
    this.carService.getCarById(id).subscribe(resp => {
      this.carModel = resp.data;
      this.xRes = this.carModel.brandName;
      let splitted = this.xRes.split(" ", 1)
      this.xRes = splitted[0];
      this.dataLoaded = true;
    });
  }


  isTheCarAvaible() {

    let checkLogin = this.wasLogined();
    
    if (checkLogin === false) {
  
      this.tools.directionPage("login");
      alert("üye girişi sayfasına yönlendiriliceksiniz")
    }
    let checkFindex = this.hasFindex();
    
   
     if (checkFindex == false) {

    } else {

      let id: number;
      this.activeRoute.params.subscribe(params => {
        id = (params["carId"]);
      });
      this.rentalService.getRentalsDtoByCarId(id).subscribe(response => {

        if (response.message == "uygun") {
          this.tools.toastWarning("kiralama için uygun lütfen tarih seçiniz", "top-center")
          let carId = id
          this.tools.reDirection("carrental/" + carId)

        }
      }, error => {
        this.tools.toastError(error.error.message, "bottom-right");
        for (var hata of error.error.Errors) {
          this.tools.toastWarning(hata.ErrorMessage, "bottom-right")
        }
      });

      this.dataLoaded = true;
    }
  }

  getPaths(id: number) {

    this.carImage.getCarImagePaths(id).subscribe(response => {
      this.carImages = response.data;

      if (response.data == null) {
        for (let i = 0; i < 5; i++) {
          this.carImages[i].imagePath = "https://i.ytimg.com/vi/6Ez_CAhSr0Q/maxresdefault.jpg";
        }
      }
    });

  }

  wasLogined() {
    let logined = localStorage.getItem("member");
    if (logined != null) {
  
      return true;
    }
    this.tools.toastSuccess(logined+"   ","center-center")
  
    return false;
  }

  hasFindex(): boolean {


    let customerInfo = localStorage.getItem("member");
    let user = customerInfo.split(";", 2);
    let userId = parseInt(user[1]);
    this.customerService.getCustemerByUserId(userId).subscribe(res => {
      this.customerId = res.data.id
      this.customerService.getFindexByCustomerId(this.customerId).subscribe(res => {
        let point = this.carModel.dailyPrice * 30 / 100;
        let check = res.data.findexPoint >= point;
        if (!check) {
          alert("findeks puanınız yetersiz başka araç seçiniz")
          this.tools.directionPage("cars");
        }

      }, error => {
        localStorage.setItem("findexError", "0")
      });
    });
    let tosla = localStorage.getItem("findexError")
    let check: boolean = true;

    if (tosla == null) {
      return check;

    } else {
      localStorage.removeItem("findexError");
      this.tools.toastInfo("Findex hesaplama sayfasına yönlendirildiniz", "bottom-right");
      this.showFindex = true;
      check = false
    }

    return check;
  }

}



