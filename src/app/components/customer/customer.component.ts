import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerModel } from './customer';
import { CustomerDto } from './CustomerDto';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  dataLoaded=false;
  filterText="";
  customers:CustomerModel[]=[];
  customersDto:CustomerDto[]=[];
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getCustomersDto();
  }
  
  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data;
      this.dataLoaded=true;
    });
  }

  getCustomersDto(){
    this.customerService.getCustomerDto().subscribe(response=>{
      this.customersDto=response.data;
      this.dataLoaded=true;
    })

  }

}
