import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRental]'
})
export class RentalDirective implements OnInit {
  @Input() appRental: string;
 
  constructor( private el:ElementRef) { }

  ngOnInit(){
    this.el.nativeElement.style.backgroundColor=this.appRental;
  }
}