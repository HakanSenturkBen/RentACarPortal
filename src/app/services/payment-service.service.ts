import { ListResponseModel } from './../modules/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../components/car-rental/cardModel';
import { PaymentModel } from '../modules/paymentModel';
import { SingleResponseModel } from '../modules/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  apiUrl="https://localhost:44314/api/bankpayments/";

  constructor(private http:HttpClient) { }

  addPayment(payment:PaymentModel):Observable<SingleResponseModel<PaymentModel>>{
    return this.http.post<SingleResponseModel<PaymentModel>>(this.apiUrl+"add",payment)
  }

  getCardInfo(cardNumber:string):Observable<SingleResponseModel<CreditCard>>{
    return this.http.get<SingleResponseModel<CreditCard>>("https://localhost:44314/api/creditcards/getcardinfo?card="+cardNumber);

  }

  getCardByCustomerId(customerId:number):Observable<SingleResponseModel<CreditCard>>{
    return this.http.get<SingleResponseModel<CreditCard>>("https://localhost:44314/api/creditcards/getcardByCustomerId?customerId="+customerId);

  }

  getAllCardByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>>{
    return this.http.get<ListResponseModel<CreditCard>>("https://localhost:44314/api/creditcards/getallbycustomerid?customerId="+customerId);

  }

  setCard(card:CreditCard):Observable<SingleResponseModel<CreditCard>>{
    return this.http.post<SingleResponseModel<CreditCard>>("https://localhost:44314/api/creditcards/add",card);
  }

  updateCard(card:CreditCard):Observable<SingleResponseModel<CreditCard>>{
    return this.http.post<SingleResponseModel<CreditCard>>("https://localhost:44314/api/creditcards/update",card);
  }


}
