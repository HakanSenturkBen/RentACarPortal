import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDto } from '../components/rental/rentalDto';
import { RentalModel } from '../components/rental/rentalModel';
import { ListResponseModel } from '../modules/listResponseModel';

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
}
