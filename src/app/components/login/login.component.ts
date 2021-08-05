import { CustomerService } from './../../services/customer.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToolsService } from './../../services/tools.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output() childEvent = new EventEmitter();
  loginForm: FormGroup;
  public nameMember: string = "";
  public say: number = 0;
  constructor(private tools: ToolsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    let tasi: string = "ilk değer";
    if (this.loginForm.valid) {

      let userLogin = Object.assign({}, this.loginForm.value)

      this.authService.login(userLogin).subscribe(res => {
        let message = res.message.split(";", 2);
        let customerId = parseInt(message[1]);
        this.customerService.getCustemerByUserId(customerId).subscribe(response => {
          localStorage.setItem("customerId", response.data.id + "")
        })
        localStorage.setItem("member", res.message)
        localStorage.setItem("token", res.data.token)
        this.tools.toastSuccess(res.message, "center-center");

        this.say = 0;
        this.tools.refreshPage();

      }, error => {
        localStorage.removeItem("member");
        localStorage.removeItem("token");

        this.tools.toastSuccess(error.error, "center-center");
        this.nameMember = localStorage.getItem("member");
      });
    } 
  }

  onChange() {
    this.login();

    this.nameMember = localStorage.getItem("member");
    if (this.nameMember != null && this.nameMember.length > 1) {
      this.say = 0;
      this.childEvent.emit(this.nameMember);
    } else {

      this.say += 1;
      if (this.say > 4) {
        this.say = 0;
        this.tools.reDirection("register");
      }
      this.childEvent.emit('1');
    }
  }
}
