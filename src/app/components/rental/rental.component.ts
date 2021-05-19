import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import { RentalDto } from './rentalDto';
import { RentalModel } from './rentalModel';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  dataLoaded=false;
  filterText="";
  rentals:RentalModel[]=[];
  rentalsDto:RentalDto[]=[];
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentals();
    this.  getRentaldDto();
    this.dataLoaded=true;
  }
  
  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data;
    });
  }

  getRentaldDto(){
    this.rentalService.getRentalsDto().subscribe(response=>{
      this.rentalsDto=response.data;
    });
  }
}
