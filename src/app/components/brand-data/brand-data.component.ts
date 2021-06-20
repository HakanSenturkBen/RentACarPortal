import { ToolsService } from 'src/app/services/tools.service';
import { BrandModel } from './../brand/brandModel';
import { Component, Input, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-data',
  templateUrl: './brand-data.component.html',
  styleUrls: ['./brand-data.component.css']
})
export class BrandDataComponent implements OnInit {

  @Input() brand:BrandModel
  constructor(private tools:ToolsService,
    private brandService:BrandService) { }
    
  ngOnInit(): void {
  }

  update(){
    this.brandService.updateBrand(this.brand).subscribe(res=>{
      this.tools.toastSuccess(res.message.toString(),"center-center");
    },error=>{
      this.tools.toastSuccess(error.error.message,"center-center");
    });

  }

  delete(){
    this.brandService.delBrand(this.brand).subscribe(res=>{
      this.tools.toastSuccess(res.message.toString(),"center-center")
    },error=>{
      this.tools.toastSuccess(error.error.message,"center-center");
    });

  }

  modalClose(){
    this.tools.refreshPage();
  }

}
