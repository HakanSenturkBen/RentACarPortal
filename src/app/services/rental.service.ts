import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDto } from '../components/rental/rentalDto';
import { RentalModel } from '../components/rental/rentalModel';
import { ListResponseModel } from '../modules/listResponseModel';
import { SingleResponseModel } from '../modules/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44314/api/rentals/";
  constructor(private http:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalModel>>{
    return this.http.get<ListResponseModel<RentalModel>>(this.apiUrl+"getAll")
  }
  getRentalsDto():Observable<ListResponseModel<RentalDto>>{
    return this.http.get<ListResponseModel<RentalDto>>(this.apiUrl+"getrentalsdto")
  }

  getRentalsDtoByCarId(id:number):Observable<ListResponseModel<RentalDto>>{
    return this.http.get<ListResponseModel<RentalDto>>(this.apiUrl+"getrentalsdto?carId="+id)
  }

  addRental(rental:RentalModel):Observable<SingleResponseModel<RentalModel>>{
    return this.http.post<SingleResponseModel<RentalModel>>(this.apiUrl+"add",rental)
  }
}
