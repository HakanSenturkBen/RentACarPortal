import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorModel } from '../components/colors/colors';
import { ListResponseModel } from '../modules/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  
  apiUrl="https://localhost:44314/api/colors";

  constructor(private http:HttpClient) { }

  getColors():Observable<ListResponseModel<ColorModel>>{
    return this.http.get<ListResponseModel<ColorModel>>(this.apiUrl+"/getall");

  }
 }
