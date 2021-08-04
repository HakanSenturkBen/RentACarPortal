import { ColorModel } from './../colors/colors';
import { ToolsService } from './../../services/tools.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ColorsService } from 'src/app/services/colors.service';

@Component({
  selector: 'add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {

  constructor(private tools: ToolsService,
    private colorService: ColorsService) { }
  @Output() childEvent = new EventEmitter();
  color: ColorModel = { id: 0, colorName: "" };

  ngOnInit(): void {
  }

  save(value: any) {
    this.colorService.addColor(this.color).subscribe(res => {
      this.tools.toastInfo(res.message.toString(), "bottom-right");
    }, error => {
      this.tools.toastInfo(error.error.message, "bottom-right");
      for (var hata of error.error.Errors) {
        this.tools.toastInfo(hata.ErrorMessage, "bottom-right")
      }
    });
    this.onChange(value);
  }

  onChange(value: any) {
    this.childEvent.emit(value);
  }


}
