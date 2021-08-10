import { ToolsService } from './../../services/tools.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  childEvent:any;
  constructor( private tools:ToolsService) { }

  logining:string="0";

  ngOnInit(): void {
    this.logining=localStorage.getItem("member");
    if (this.logining===null) {this.logining="0";
      
    }
  }

  log()
  {
    this.logining="1";
  }

  olay(olay:string){
    this.logining=olay
    
  }

  logOut(){
    localStorage.removeItem("member")
    localStorage.removeItem("token")
    this.tools.refreshPage();
  }

  

  

}
