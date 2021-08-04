import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private router:Router,
    private toast:ToastrService) { }

  reDirection(path:string){
    this.router.navigate([path]);
  }

  refreshPage(){
    window.location.reload();
  }

  directionPage(page:string){
    window.location.assign(page);
  }

  toastInfo(message:string,position:string){
    this.toast.info(message," ",{positionClass:"toast-"+position});
  }
  toastWarning(message:string,position:string){
    this.toast.warning(message," ",{positionClass:"toast-"+position});
  }

  toastSuccess(message:string,position:string){
    this.toast.success(message," ",{positionClass:"toast-"+position});
  }

  toastError(message:string,position:string){
    this.toast.error(message," ",{positionClass:"toast-"+position});
  }

  lsGet(name:string){
    localStorage.getItem(name);
  }

  lsSet(name:string, data:string){
    localStorage.setItem(name,data);
  }

  lsDel(name:string){
    localStorage.removeItem(name);
  }

  lsClear(){
    localStorage.clear();
  }


}
