import { PaymentServiceService } from './../../services/payment-service.service';
import { CreditCard } from './../car-rental/cardModel';
import { CompanyModel } from './../customer/company';
import { AddressModel } from './../customer/address';
import { CustomerDto } from './../customer/customerDto';
import { User } from './../data-processor/user';
import { AuthService } from './../../services/auth.service';
import { CustomerService } from './../../services/customer.service';
import { ToolsService } from './../../services/tools.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../customer/customer';
import { ClaimModel } from '../data-processor/claimModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;
  public companyForm: FormGroup;
  public addressForm: FormGroup;
  public cardForm: FormGroup;

  progressbar = 0;
  menu: string[] = ["", "", "", "", ""];



  constructor(private formBuilder: FormBuilder,
    private tools: ToolsService,
    private customerService: CustomerService,
    private authService: AuthService,
    private paymentService: PaymentServiceService) { }

  ngOnInit(): void {
    this.createUserForm();
    this.createCompanyForm();
    this.createAddressForm();
    this.createCardForm();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      password: ["", Validators.required],
      passwordAgain: ["", Validators.required],
      citizenShipNumber: ["", Validators.required],
    });
  }

  createCompanyForm() {
    this.companyForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      taxOfficeName: ["", Validators.required],
      taxNumber: ["", Validators.required],
      coPhoneNumber: ["", Validators.required],
    });
  }

  createAddressForm() {
    this.addressForm = this.formBuilder.group({
      address1: ["", Validators.required],
      address2: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
    });
  }

  createCardForm() {
    this.cardForm = this.formBuilder.group({
      cardHolderName: ["", Validators.required],
      ccv: ["", Validators.required],
      validationDate: ["", Validators.required],
      cardNumber: ["", Validators.required],
    });
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
        if (this.userForm.valid) {
          this.current(index);
        } break;
      case 3:
        if (this.companyForm.valid) {
          this.current(index);
        }
        break;
      case 4:
        if (this.addressForm) {
          this.current(index);
        }
        break;

      case 0:
        if (this.cardForm.valid) {
          this.current(index);
        }

        break;
    }
  }

  addMembership() {
    let currentUser = this.userForm.value;
    let userId = { userId: 0 };

    if (this.companyForm.valid && this.addressForm.valid && this.cardForm.valid && this.userForm.valid) {

      let user: User = { firstName: currentUser.firstName, lastName: currentUser.lastName, email: currentUser.email, password: currentUser.password };
      let address: AddressModel = Object.assign({}, this.addressForm.value);
      let company: CompanyModel = Object.assign({}, this.companyForm.value);

      // user recording
      this.authService.AddUser(user).subscribe(res => {
        userId.userId = parseInt(res.message);
        this.tools.toastSuccess("user id = " + userId.userId, "center-center");
        let userClaim: ClaimModel = { id: 0, userId: userId.userId, operationClaimId: 1 };
        this.authService.addClaim(userClaim).subscribe(res => {
          this.tools.toastSuccess(res.message, "center-center");
        })

        // address recording
        this.customerService.setAddress(address).subscribe(res => {
          address.id = parseInt(res.message);
          this.tools.toastSuccess("address id=  " + address.id, "center-center");

          // company recording
          this.customerService.setCompany(company).subscribe(res => {
            company.id = parseInt(res.message);
            this.tools.toastSuccess("companyId = " + company.id, "center-center");

            //customer recording
            let customer: CustomerModel = {
              id: 0,
              userId: userId.userId,
              addressId: address.id,
              companyId: company.id,
              phoneNumber: currentUser.phoneNumber,
              password: currentUser.password,
              citizenShipNumber: currentUser.citizenShipNumber
            };
            this.customerService.setCustomerDto(customer).subscribe(res => {
              this.tools.toastSuccess("tebrik", "center-center")
              let card: CreditCard = Object.assign({}, this.cardForm.value);
              card.customerId = parseInt(res.message);
              this.paymentService.setCard(card).subscribe(res => {
                this.tools.toastSuccess("tebrik " + card.cardNumber + " no.lu kartınız kaydedildi.", "center-center");
              });
            });
          }, error => {
            this.tools.toastSuccess(error.error, "center-center")
          });
        }, error => {
          this.tools.toastSuccess(error.error, "center-center")
        });
      }, error => {
        this.tools.toastSuccess(error.error, "center-center")
      });
    } else {
      this.tools.toastSuccess("yazıklar olsun", "center-center")
    }
  }
}
