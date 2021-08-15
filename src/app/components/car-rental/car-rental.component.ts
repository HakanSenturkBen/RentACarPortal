import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentModel } from 'src/app/modules/paymentModel';
import { CarService } from 'src/app/services/car.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToolsService } from 'src/app/services/tools.service';
import { RentalModel } from '../rental/rentalModel';
import { CreditCard } from './cardModel';




@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {
  progressBar = 25;
  minDate: string;
  maxDate: string;
  inception: Date = new Date;
  ilkTarih: Date = new Date;
  sonTarih: Date = new Date;
  tutar: number;
  modal = false;
  creditCard: string;
  carId: number;
  cards: CreditCard[] = [];
  addCard = false;
  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
  };
  customerId: number;
  rastgele: string;
  dogrula: string;
  kucukmodal = false;
  kart: CreditCard = {
    id: null,
    customerId: null,
    cardNumber: null,
    validationDate: null,
    cvv: null,
    limit: null,
    cardHolderName: null
  };

  constructor(private carService: CarService,
    private activeRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentServiceService,
    private tools: ToolsService) { }

  ngOnInit(): void {
    let mouth: string;
    let day: string
    const currentDate = new Date();
    let gun = currentDate.getDate();

    let ay = currentDate.getMonth() + 1;
    if (gun > 30) {
      gun = 1;
      ay += 1
    } else {
      gun += 1;
    }

    let yil = currentDate.getFullYear();
    if (gun < 10) { day = "0" + gun } else { day = "" + gun }
    if (ay < 10) { mouth = "0" + ay } else { mouth = "" + ay }
    this.minDate = yil + "-" + mouth + "-" + day;
    this.maxDate = yil + 1 + "-" + mouth + "-" + day;
    this.getCards();
  }

  getCards() {

    this.customerId = parseInt(localStorage.getItem("customerId"))
    this.paymentService.getAllCardByCustomerId(this.customerId).subscribe(response => {
      this.cards = response.data;
    })
  }

  choice(p: any) {
    let card = p.target.value;
    this.kart = JSON.parse(card);
  }

  changeProgress(count: number) {
    this.progressBar = count;
  }

  hesapla() {

    const firstdate = new Date(this.ilkTarih);
    const lastdate = new Date(this.sonTarih);
    let wrong = this.inception > firstdate;
    if (wrong) {

      this.tools.toastInfo("lütfen geçerli bir tarih seçiniz", "center-center");
    } else {
      let date1 = (lastdate.getUTCDate() + (lastdate.getUTCMonth() * 30) + (lastdate.getUTCFullYear() * 365)) - (firstdate.getUTCDate() + (firstdate.getUTCMonth() * 30) + (firstdate.getUTCFullYear() * 365));
      this.activeRoute.params.subscribe(params => {
        this.carId = parseInt((params["carId"]));
      });

      this.carService.getCarById(this.carId).subscribe(res => {
        let dailyPrice = res.data.dailyPrice;
        this.tutar = date1 * dailyPrice;
        this.modal = true;

      });
    }
  }


  modalClose() {
    this.modal = false;

  }

  payAndFinish() {

    if (this.kart.cardNumber != "") {

      this.progressBar = 100;

      this.paymentService.getCardInfo(this.kart.cardNumber).subscribe(res => {

        if (res.data == null) {
          this.rastgele = this.newGuid();
          this.kucukmodal = true;

        } else {
          this.kart = res.data;
          if (this.kart.limit < this.tutar) {

            this.tools.toastWarning("limit yetersiz", "center-center")
          } else {
            this.tools.toastInfo("Provizyon alındı", "center-center")
            this.rastgele = this.newGuid();
            this.kucukmodal = true;
          }
        }
      }, error => {
        this.tools.toastInfo(error.error.message, "bottom-right");
        for (var hata of error.error.Errors) {
          this.tools.toastInfo(hata.ErrorMessage, "bottom-right")
        }

      });
      this.modalClose();

    }
  }

  validate() {

    if (this.dogrula == this.rastgele) {
      let rental: RentalModel = {
        id: 0,
        carId: this.carId,
        customerId: 1,
        rentDate: this.ilkTarih,
        returnDate: this.sonTarih
      };

      this.rentalService.addRental(rental).subscribe(res => {
        this.tools.toastSuccess("kiralama kaydedildi", "center-center");
        let message = parseInt(res.message);
        let payment: PaymentModel = {
          Id: 0,
          BankName: "Yapı ve Kredi Bankası",
          RentalId: message,
          AccountName: this.customerId + "",
          AccountNumber: "12979166",
          CreditCardNumber: this.kart.cardNumber,
          TransactionAmount: this.tutar
        };
        this.paymentService.addPayment(payment).subscribe(response => {
          this.tools.toastSuccess("ödeme kaydedildi", "center-center");
        });
      });
      this.kucukmodal = false;
      this.addCard = true;
    } else {
      this.tools.toastWarning("ödeme işlemi başarısız" + this.dogrula + " " + this.rastgele, "center-center");
    }
  }

  openDialogStatus(event: any) {

    if (event == '1') {
      this.kart.id = 0;
      this.kart.customerId = this.customerId;
      this.kart.limit = this.tutar * 1.50;
      this.tools.toastSuccess(this.kart.limit + "", "center-center");
      this.paymentService.setCard(this.kart).subscribe(response => {
        this.tools.toastSuccess(response.message, "center-center");
        this.tools.toastSuccess(this.kart.limit + "", "center-center");
        this.addCard = false;

      })
      this.tools.toastSuccess(this.kart.limit + "  " + event, "center-center");
    } else {
      this.tools.toastSuccess(this.kart.limit + "  " + event, "center-center");
    }

    this.tools.reDirection("cars");
  }

  newGuid() {
    return 'xXxx-xxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return (v.toString(16));
    });
  }

}