import { Component, OnInit } from '@angular/core';
import { ColorsService } from 'src/app/services/colors.service';
import { ColorModel } from './colors';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

  dataLoaded=false;
  colors:ColorModel[]=[];
  filterText="";

  constructor(private colorService:ColorsService) { }

  ngOnInit(): void {
    this.getColors();
    
  }

  getColors(){
   return this.colorService.getColors().subscribe(response=>{
     this.colors=response.data
     this.dataLoaded=true
   });
   
  }
  
}
