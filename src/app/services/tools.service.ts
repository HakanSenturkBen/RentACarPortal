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

  toastInfo(message:string,position:string){
    this.toast.info(message," ",{positionClass:"toast-"+position});
  }
  toastWarning(message:string,position:string){
    this.toast.warning(message," ",{positionClass:"toast-"+position});
  }

  toastSuccess(message:string,position:string){
    this.toast.success(message," ",{positionClass:"toast-"+position});
  }

}
