import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarInfoModel } from '../components/car/carInfoModel';
import { CarModel } from '../components/car/carModel';
import { ListResponseModel } from '../modules/listResponseModel';
import { SingleResponseModel } from '../modules/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44314/api/cars/";
  constructor(private http:HttpClient) { }


getCars():Observable<ListResponseModel<CarModel>>{
  return this.http.get<ListResponseModel<CarModel>>(this.apiUrl+"getall");
}

getCarInfo():Observable<ListResponseModel<CarInfoModel>>{
  return this.http.get<ListResponseModel<CarInfoModel>>(this.apiUrl+"getcarinfo");
}

getCarById(carId:number):Observable<SingleResponseModel<CarInfoModel>>{
  return this.http.get<SingleResponseModel<CarInfoModel>>(this.apiUrl+"getbycarid?carId="+carId);
}

getCarsByColor(colorId:number):Observable<ListResponseModel<CarInfoModel>>{
  return this.http.get<ListResponseModel<CarInfoModel>>(this.apiUrl+"getbycolorid?colorId="+colorId);
}

getCarsByBrand(brandId:number):Observable<ListResponseModel<CarInfoModel>>{
  return this.http.get<ListResponseModel<CarInfoModel>>(this.apiUrl+"getbybrandrid?brandId="+brandId);
}

saveCar(car:CarModel):Observable<SingleResponseModel<CarModel>>{
  return this.http.post<SingleResponseModel<CarModel>>(this.apiUrl+"add",car)

}

updateCar(car:CarModel):Observable<SingleResponseModel<CarModel>>{
  return this.http.post<SingleResponseModel<CarModel>>(this.apiUrl+"update",car)

}

delCar(car:CarModel):Observable<SingleResponseModel<CarModel>>{
  return this.http.post<SingleResponseModel<CarModel>>(this.apiUrl+"delete",car)

 
}

delCarById(carId:number):Observable<SingleResponseModel<CarModel>>{
  console.log("carId=",carId);
  return this.http.post<SingleResponseModel<CarModel>>(this.apiUrl+"del?carId="+carId,carId)

}

}
