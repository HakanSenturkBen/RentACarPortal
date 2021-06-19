import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentModel } from 'src/app/modules/paymentModel';
import { CarService } from 'src/app/services/car.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToolsService } from 'src/app/services/tools.service';
import { RentalModel } from '../rental/rentalModel';
import { FormsModule } from '@angular/forms';
import { CreditCard } from './cardModel';
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {

  minDate:string;
  maxDate:string;
  ilkTarih:Date=new Date;
  sonTarih:Date=new Date;
  tutar:number;
  modal=false;
  creditCard:string;
  carId:number;
  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/,/\d/,/\d/,/\d/, ' ',/\d/,/\d/,/\d/,/\d/, ' ',/\d/,/\d/,/\d/,/\d/, ' ', /\d/, /\d/, /\d/, /\d/]
  };
  rastgele:string;
  dogrula:string;
  kucukmodal=false;
  kart:CreditCard={ id: 11,
    cardNumber: "",
    dateofIssue: null,
    validationDate: null,
    cvv: "",
    limit: null,
    cardHolderName: ""};
  
  constructor(private carService:CarService,
    private activeRoute:ActivatedRoute,
    private rentalService:RentalService,
    private paymentService:PaymentServiceService,
    private tools:ToolsService) { }

  ngOnInit(): void {
    let mouth:string;
    const currentDate=new Date();  
    let gun=currentDate.getDate()+1;
    let ay=currentDate.getMonth()+1;
    let yil=currentDate.getFullYear();
    if(ay<10){mouth="0"+ay}else{mouth=""+ay}
    this.minDate=yil+"-"+mouth+"-"+gun;
    this.maxDate=yil+1+"-"+mouth+"-"+gun;
    
  }

  hesapla(){
    const firstdate=new Date(this.ilkTarih);
    const lastdate=new Date(this.sonTarih); 
    let date1=(lastdate.getUTCDate()+(lastdate.getUTCMonth()*30)+(lastdate.getUTCFullYear()*365))-(firstdate.getUTCDate()+(firstdate.getUTCMonth()*30)+(firstdate.getUTCFullYear()*365));
    this.activeRoute.params.subscribe(params=>{
      this.carId=parseInt((params["carId"]));});
    
    this.carService.getCarById(this.carId).subscribe(res=>{
      let dailyPrice=res.data.dailyPrice;
      this.tutar=date1*dailyPrice;
      this.modal=true;
    
    });

  }


  modalClose(){
    this.modal=false;
      
  }

  payAndFinish(){
    
    
    this.paymentService.getCardInfo(this.creditCard).subscribe(res=>{
      this.kart=res.data;

      if(this.kart.limit<this.tutar){

       this.tools.toastWarning("limit yetersiz","center-center")
      }else{
        this.tools.toastInfo("Provizyon alındı","center-center")
        this.rastgele=this.newGuid();
        this.kucukmodal=true;
      }
 
    }, error=>{this.tools.toastWarning(error.error.message,"center-center");});
    
    this.modalClose();
  }

  validate(){
    if(this.dogrula==this.rastgele){
      alert("ödeme gerçekleşti");
      let rental:RentalModel={
                id:0,
                carId:this.carId,
                customerId:1,
                rentDate:this.ilkTarih,
                returnDate:this.sonTarih};
      
      this.rentalService.addRental(rental).subscribe(res=>{
        alert("kiralama kaydedildi");
        let message=parseInt(res.message);
        let payment:PaymentModel={
          Id: 0,
          BankName: "Yapı ve Kredi Bankası",
          RentalId: message,
          AccountName: "hakan şentürk",
          AccountNumber: "12979166",
          CreditCardNumber: this.creditCard,
          TransactionAmount: this.tutar};
          this.paymentService.addPayment(payment).subscribe(response=>{
            alert("ödeme kaydedildi");
            

          });
  
      });
    }else{
      alert("ödeme işlemi başarısız");  
  }
  this.tools.reDirection("cars");

  
}




newGuid() {
  return 'xXxx-xxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
    v = c == 'x' ? r : (r & 0x3 | 0x8);
    return (v.toString(16));
  });
}

}