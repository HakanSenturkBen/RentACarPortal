import { ToolsService } from './../services/tools.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService:AuthService,
    private tools:ToolsService,
     private router:Router){

 }

 canActivate(
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
     if(this.authService.isAuthenticated()){
      
       return true;
     }else{
       this.router.navigate(["login"])
       this.tools.toastSuccess(this.authService.isAuthenticated()+"Sisteme giriş yapmalısınız","center-center")
       return false;
     }


 }
  
}