import { SingleResponseModel } from './../modules/singleResponseModel';
import { CarImageModel } from './../components/car-detail/carImageModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../modules/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44314/api/carimages/";
  constructor(private http:HttpClient) { }

  getCarImagePaths(id:number):Observable<ListResponseModel<CarImageModel>>{
    return this.http.get<ListResponseModel<CarImageModel>>(this.apiUrl+"getimagebyid?carId="+id);
  }

  addCarImagePaths(image:CarImageModel):Observable<SingleResponseModel<CarImageModel>>{
    return this.http.post<SingleResponseModel<CarImageModel>>(this.apiUrl+"add",image);
  }
}
