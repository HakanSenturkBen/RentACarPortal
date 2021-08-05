import { CustomerDto } from './../customer/customerDto';
import { CreditCard } from './../car-rental/cardModel';
import { CustomerModel } from './../customer/customer';
import { CompanyModel } from './../customer/company';
import { AddressModel } from './../customer/address';
import { PaymentServiceService } from './../../services/payment-service.service';
import { AuthService } from './../../services/auth.service';
import { CustomerService } from './../../services/customer.service';
import { ToolsService } from './../../services/tools.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  public userForm: FormGroup;
  public companyForm: FormGroup;
  public addressForm: FormGroup;
  public cardForm: FormGroup;
  currentCustomer: CustomerDto
  currentCard: CreditCard
  customerId: number;

  progressbar = 0;
  menu: string[] = ["", "", "", "", ""];



  constructor(private formBuilder: FormBuilder,
    private tools: ToolsService,
    private customerService: CustomerService,
    private authService: AuthService,
    private paymentService: PaymentServiceService) { }

  get lastName() { return this.cardForm.get('lastName') }
  get email() { return this.userForm.get('email') }
  get cardNumber() { return this.cardForm.get('cardNumber') }
  get cardHolderName() { return this.cardForm.get('cardHolderName') }
  get ccv() { return this.cardForm.get('ccv') }
  get validationDate() { return this.cardForm.get('validationDate') }

  ngOnInit(): void {

    let carrier = localStorage.getItem("member");
    carrier = carrier.split(";", 2)[1];
    this.customerService.getCustemerByUserId(parseInt(carrier)).subscribe(res => {
      this.customerId = res.data.id;
      this.customerService.getCustomerDtoById(this.customerId).subscribe(res => {
        this.currentCustomer = res.data;
        this.createAddressForm();
        this.createCompanyForm();
        this.createUserForm();
        this.paymentService.getAllCardByCustomerId(this.currentCustomer.customerId).subscribe(res => {
          let cards=res.data;
          this.currentCard = cards[0];
          
          this.createCardForm();
        });
      });
    });
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: [this.currentCustomer.firstName, Validators.required],
      lastName: [this.currentCustomer.lastName, Validators.required],
      email: [this.currentCustomer.email, Validators.required],
      phoneNumber: [this.currentCustomer.phoneNumber, Validators.required],
      password: [this.currentCustomer.password, Validators.required],
      passwordAgain: [this.currentCustomer.password, Validators.required],
      citizenShipNumber: [this.currentCustomer.citizenShipNumber, Validators.required],
    });
  }

  createCompanyForm() {
    this.companyForm = this.formBuilder.group({
      companyName: [this.currentCustomer.companyName, Validators.required],
      taxOfficeName: [this.currentCustomer.taxOfficeName, Validators.required],
      taxNumber: [this.currentCustomer.taxNumber, Validators.required],
      coPhoneNumber: [this.currentCustomer.coPhoneNumber, Validators.required],
    });
  }

  createAddressForm() {
    this.addressForm = this.formBuilder.group({
      address1: [this.currentCustomer.address1, Validators.required],
      address2: [this.currentCustomer.address2, Validators.required],
      city: [this.currentCustomer.city, Validators.required],
      state: [this.currentCustomer.state, Validators.required],
    });
  }

  createCardForm() {
    this.cardForm = this.formBuilder.group({
      cardHolderName: [this.currentCard.cardHolderName, Validators.required],
      ccv: [this.currentCard.cvv, Validators.required],
      validationDate: [this.currentCard.validationDate, Validators.required],
      cardNumber: [this.currentCard.cardNumber, Validators.required],
    })
  }

  current(index: number) {
    switch (index) {
      case 0:
        this.progressbar = 100;
        break;
      case 1:
        this.progressbar = 0;
        break;
      case 2:
        this.progressbar = 25;
        break;
      case 3:
        this.progressbar = 50;
        break;
      case 4:
        this.progressbar = 75;
        break;

      default:

        break;
    }
    for (let i = 0; i < this.menu.length; i++) {
      if (i == index) {
        this.menu[i] = "selected"
      } else {
        this.menu[i] = "";
      }
    }
  }

  checkButton(index: number) {
    switch (index) {
      case 2:
        let currentUser = this.userForm.value;
        let customer: CustomerModel = {
          id: this.currentCustomer.customerId,
          userId: this.currentCustomer.userId,
          addressId: this.currentCustomer.addressId,
          companyId: this.currentCustomer.companyId,
          phoneNumber: currentUser.phoneNumber,
          password: currentUser.password,
          citizenShipNumber: currentUser.citizenShipNumber
        };
        this.customerService.updateCustomerDto(customer).subscribe(res => { });

        let user = { id: this.currentCustomer.userId, firstName: currentUser.firstName, lastName: currentUser.lastName, email: currentUser.email, password: currentUser.password };
        this.authService.updateUser(user).subscribe(res => { });
        this.current(index);
        break;
      case 3:
        let company: CompanyModel = Object.assign({}, this.companyForm.value);
        company.id=this.currentCustomer.companyId;
        this.customerService.updateCompany(company).subscribe(res => { });
        this.current(index);
        break;
      case 4:
        let address: AddressModel = Object.assign({}, this.addressForm.value);
        address.id=this.currentCustomer.addressId;
        this.customerService.updateAddress(address).subscribe(res => { });
        this.current(index);
       
        break;

      case 0:
        let card: CreditCard = Object.assign({}, this.cardForm.value);
        this.paymentService.updateCard(card).subscribe(res => { });
        this.current(index);

        break;

      default:
        break;
    }
  }

  checkPassword() {
    let control=Object.assign({},this.userForm.value);
    if (control.password!=control.passwordAgain) {
      this.tools.toastWarning("parolalar aynı değil","center-center")
    }
  }

}
