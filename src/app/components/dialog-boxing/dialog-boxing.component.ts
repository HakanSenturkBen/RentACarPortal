import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'dialog-boxing',
  templateUrl: './dialog-boxing.component.html',
  styleUrls: ['./dialog-boxing.component.css']
})
export class DialogBoxingComponent implements OnInit {

  @Input() messages:string;
  @Output()  childEvent = new EventEmitter();

  constructor() { }

  
  ngOnInit(): void {
    if(this.messages==null){
      this.messages="Kayıt silinecek emin misiniz?"
    }

  }

  onChange(value:any) {
    this.childEvent.emit(value);
  }

}
