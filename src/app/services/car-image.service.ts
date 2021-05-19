import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImageModel } from '../components/car-detail/carImageModel';
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
}
