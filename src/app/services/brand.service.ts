import { SingleResponseModel } from './../modules/singleResponseModel';
import { BrandModel } from './../components/brand/brandModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  addBrand(brand:BrandModel):Observable<SingleResponseModel<BrandModel>>{
    return this.http.post<SingleResponseModel<BrandModel>>(this.apiUrl+"/add",brand);
  }

  updateBrand(brand:BrandModel):Observable<SingleResponseModel<BrandModel>>{
    return this.http.post<SingleResponseModel<BrandModel>>(this.apiUrl+"/update",brand);
  }

  delBrand(brand:BrandModel):Observable<SingleResponseModel<BrandModel>>{
    return this.http.post<SingleResponseModel<BrandModel>>(this.apiUrl+"/delete",brand);
  }
}
