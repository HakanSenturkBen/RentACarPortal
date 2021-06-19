import { ColorModel } from './../colors/colors';
import { ToolsService } from 'src/app/services/tools.service';
import { Component, Input, OnInit } from '@angular/core';
import { ColorsService } from 'src/app/services/colors.service';

@Component({
  selector: 'app-color-data',
  templateUrl: './color-data.component.html',
  styleUrls: ['./color-data.component.css']
})
export class ColorDataComponent implements OnInit {
  
  @Input() color:ColorModel

  constructor(private tools:ToolsService,
    private colorService:ColorsService) { }

  ngOnInit(): void {
  }

  update(){
    this.colorService.updateColor(this.color).subscribe(res=>{
      this.tools.toastSuccess(res.message.toString(),"center-center");
    });
  }

  delete(){
    this.colorService.delColor(this.color).subscribe(res=>{
      this.tools.toastSuccess(res.message.toString(),"center-center")
    })

  }

  modalClose(){
    this.tools.refreshPage();
  }

}
