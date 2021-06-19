import { SingleResponseModel } from './../modules/singleResponseModel';
import { ColorModel } from './../components/colors/colors';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addColor(color:ColorModel):Observable<SingleResponseModel<ColorModel>>{
    return this.http.post<SingleResponseModel<ColorModel>>(this.apiUrl+"/add",color);
  }

  updateColor(color:ColorModel):Observable<SingleResponseModel<ColorModel>>{
    return this.http.post<SingleResponseModel<ColorModel>>(this.apiUrl+"/update",color);
  }

  delColor(color:ColorModel):Observable<SingleResponseModel<ColorModel>>{
    return this.http.post<SingleResponseModel<ColorModel>>(this.apiUrl+"/delete",color);
  }
 }
