import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../components/customer/customer';
import { CustomerDto } from '../components/customer/CustomerDto';
import { ListResponseModel } from '../modules/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44314/api/customers/";
  constructor(private http:HttpClient) { }


  getCustomers():Observable<ListResponseModel<CustomerModel>>{
    return this.http.get<ListResponseModel<CustomerModel>>(this.apiUrl+"getall")
  }
  getCustomerDto():Observable<ListResponseModel<CustomerDto>>{
    return this.http.get<ListResponseModel<CustomerDto>>(this.apiUrl+"getcustomerdto")
  }
}
