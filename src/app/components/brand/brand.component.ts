import { Component, OnInit } from '@angular/core';

import { BrandService } from 'src/app/services/brand.service';
import { BrandModel } from './brandModel';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  
  dataLoaded=false;
  filterText="";
  brands:BrandModel[]=[];
  currentBrand:BrandModel;
  
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
    
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    });
   
  }

}
