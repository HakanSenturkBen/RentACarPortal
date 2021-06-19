import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  @Output()  childEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onChange(value:any) {
    this.childEvent.emit(value);
  }

}
