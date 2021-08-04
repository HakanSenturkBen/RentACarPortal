import { LoginModel } from './../quards/login';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from './../interceptors/token';
import { ResponseModel } from './../modules/responseModel';
import { Observable } from 'rxjs';
import { User } from './../components/data-processor/user';
import { SingleResponseModel } from './../modules/singleResponseModel';
import { Injectable } from '@angular/core';
import { ClaimModel } from '../components/data-processor/claimModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://localhost:44314/api/auth/";

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }
  isAuthenticated(){
    
    if (localStorage.getItem("token")) {
      return true;
  }else{
    return false;
  }

  }

  AddUser(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"register",user)
  }

  updateUser(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",user)
  }


  addClaim(claim:ClaimModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>("https://localhost:44314/api/UserOperationClaims/add",claim)
  }

}
