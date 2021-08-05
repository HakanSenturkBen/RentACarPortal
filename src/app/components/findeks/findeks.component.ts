import { CustomerService } from './../../services/customer.service';
import { ToolsService } from './../../services/tools.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerFindexModel } from '../customer/customerFindex';

@Component({
  selector: 'app-findeks',
  templateUrl: './findeks.component.html',
  styleUrls: ['./findeks.component.css']
})
export class FindeksComponent implements OnInit {

  @Input() customerIdChild: number;
  @Output() childEvent = new EventEmitter();
  modalGroup: FormGroup;
  memberShip: FormGroup;
  calculated: boolean = true;
  puan: number = 0
  customer: any;
  logout: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private tools: ToolsService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {


    this.elemetsOfModal()
    this.elementsOfMember()
    this.login()
  }

  onChange(value: any) {
    this.childEvent.emit(value);
  }

  showCalculating() {
    this.calculated = true
    console.log(this.calculated)

  }

  closeFindexWindow(event: any) {
    this.onChange(event);

  }

  elementsOfMember() {
    this.memberShip = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      address: ["", Validators.required],
      findeksPoint: ["", Validators.required],
      creditCard: ["", Validators.required]
    });


  }

  addMemberShip() {
    console.log(this.memberShip)
    if (this.memberShip.valid) {

      let customerModel = Object.assign({}, this.memberShip.value)
      customerModel.findexPoint = this.puan;
    } this.tools.toastSuccess("eksikleri tamamnla", "center-center")

  }

  elemetsOfModal() {
    this.modalGroup = this.formBuilder.group({
      not1: ["", Validators.required],
      not2: ["", Validators.required],
      not3: ["", Validators.required],
      not4: ["", Validators.required],
      not5: ["", Validators.required],
      not6: ["", Validators.required],
      not7: ["", Validators.required],
      not8: ["", Validators.required],
      not9: ["", Validators.required],
    })

  }
  findeksPointing(event: any) {
    if (this.modalGroup.valid) {

      this.puan = 0
      if (this.modalGroup.value.not1 == "Evet") {
        this.puan += 650
      }
      if (this.modalGroup.value.not2 == "Evet") {
        this.puan += 600
      }
      if (this.modalGroup.value.not3 == "Evet") {
        this.puan += 200
      }
      if (this.modalGroup.value.not4 == "Evet") {
        this.puan += 200
      }
      if (this.modalGroup.value.not5 == "Evet") {
        this.puan += 40
      }
      if (this.modalGroup.value.not6 == "Evet") {
        this.puan += 40
      }
      if (this.modalGroup.value.not7 == "Evet") {
        this.puan += 40
      }
      if (this.modalGroup.value.not8 == "Evet") {
        this.puan += 40
      }
      if (this.modalGroup.value.not9 == "Evet") {
        this.puan += 40
      }
      this.tools.toastSuccess("findeks: " + this.puan, "center-center");
      localStorage.removeItem("findexError");
      let findex: CustomerFindexModel = { id: 0, customerId: this.customerIdChild, findexPoint: this.puan };
      this.customerService.setFindexByCustomerId(findex).subscribe(res=>{
        this.tools.toastSuccess(res.message, "center-center");  
      })
      this.onChange(event);
      
    } else this.tools.toastSuccess("Bütün alanlardan seçim yapın lütfen", "center-center");
  }

  login() {
    if (localStorage.getItem("username") === null) {

    } else {
      let username: any = localStorage.getItem("username");
      this.customer = JSON.parse(username)
      this.puan = this.customer.findeksPoint
      this.logout = false;
    }

  }

  onDialog() {
    let element = this.memberShip.value;
    let id: any = localStorage.getItem("username");
    id = JSON.parse(id);
    var yeni = Object.assign({}, id, element);
  }
}
