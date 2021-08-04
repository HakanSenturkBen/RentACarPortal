import { CustomerDto } from './../components/customer/customerDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../components/customer/customer';
import { ListResponseModel } from '../modules/listResponseModel';
import { SingleResponseModel } from '../modules/singleResponseModel';
import { AddressModel } from '../components/customer/address';
import { CompanyModel } from '../components/customer/company';
import { CustomerFindexModel } from '../components/customer/customerFindex';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44314/api/customers/";
  addressUrl="https://localhost:44314/api/addresses/";
  companyUrl="https://localhost:44314/api/companies/";
  findexUrl="https://localhost:44314/api/customerFindexes/";
  constructor(private http:HttpClient) { }


  getCustomers():Observable<ListResponseModel<CustomerModel>>{
    return this.http.get<ListResponseModel<CustomerModel>>(this.apiUrl+"getall")
  }
  getCustomerDto():Observable<ListResponseModel<CustomerDto>>{
    return this.http.get<ListResponseModel<CustomerDto>>(this.apiUrl+"getcustomerdto")
  }

  getCustomerDtoById(customerId:number):Observable<SingleResponseModel<CustomerDto>>{
    return this.http.get<SingleResponseModel<CustomerDto>>(this.apiUrl+"getcustomerdtobyId?customerId="+customerId)
  }


  getCustemerByUserId(userId:number):Observable<SingleResponseModel<CustomerModel>>{
    return this.http.get<SingleResponseModel<CustomerModel>>(this.apiUrl+"getcustomerbyUserid?userId="+userId)
  }

  getFindexByCustomerId(customerId:number):Observable<SingleResponseModel<CustomerFindexModel>>{
    return this.http.get<SingleResponseModel<CustomerFindexModel>>(this.findexUrl+"getFindex?customerId="+customerId)
  }

  setFindexByCustomerId(findex:CustomerFindexModel):Observable<SingleResponseModel<CustomerFindexModel>>{
    return this.http.post<SingleResponseModel<CustomerFindexModel>>(this.findexUrl+"add",findex)
  }

  setCustomerDto(customer:CustomerModel):Observable<SingleResponseModel<CustomerModel>>{
    return this.http.post<SingleResponseModel<CustomerModel>>(this.findexUrl+"add",customer)
  }

  setAddress(address:AddressModel):Observable<SingleResponseModel<AddressModel>>{
    return this.http.post<SingleResponseModel<AddressModel>>(this.addressUrl+"add",address)
  }

  setCompany(company:CompanyModel):Observable<SingleResponseModel<CompanyModel>>{
    return this.http.post<SingleResponseModel<CompanyModel>>(this.companyUrl+"add",company)
  }

  updateCustomerDto(customer:CustomerModel):Observable<SingleResponseModel<CustomerModel>>{
    return this.http.post<SingleResponseModel<CustomerModel>>(this.apiUrl+"update",customer)
  }

  updateAddress(address:AddressModel):Observable<SingleResponseModel<AddressModel>>{
    return this.http.post<SingleResponseModel<AddressModel>>(this.addressUrl+"update",address)
  }

  updateCompany(company:CompanyModel):Observable<SingleResponseModel<CompanyModel>>{
    return this.http.post<SingleResponseModel<CompanyModel>>(this.companyUrl+"update",company)
  }
}
