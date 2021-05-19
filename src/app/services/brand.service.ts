import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandModel } from '../components/brand/brandModel';
import { ListResponseModel } from '../modules/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl="https://localhost:44314/api/brands";

  constructor(private http:HttpClient) { }

  getBrands():Observable<ListResponseModel<BrandModel>>{
    return this.http.get<ListResponseModel<BrandModel>>(this.apiUrl+"/getall");

  }
}
