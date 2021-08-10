import { AppComponent } from './../../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, NgModule } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
import { AngularTiltModule } from 'angular-tilt';


@Component({
  selector: 'app-inception',
  templateUrl: './inception.component.html',
  styleUrls: ['./inception.component.css']
})

export class InceptionComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
   
  }
}
