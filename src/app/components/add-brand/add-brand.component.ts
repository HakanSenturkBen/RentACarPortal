import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandModel } from './../brand/brandModel';
import { ToolsService } from './../../services/tools.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  @Output() childEvent = new EventEmitter();
  brand: BrandModel = { id: 0, brandName: "" };
  addBrandForm: FormGroup;


  constructor(private tools: ToolsService,
    private brandService: BrandService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createAddBrandForm()

  }

  createAddBrandForm(){
    this.addBrandForm=this.fb.group({
      brandName:["",Validators.required]
    })


  }

  save(value: any) {
    if(this.addBrandForm.valid){
      this.brand=Object.assign({},this.addBrandForm.value)

      this.brandService.addBrand(this.brand).subscribe(res => {
        this.tools.toastInfo(res.message.toString(), "bottom-right");
      }, error => {
        this.tools.toastInfo(error.error.message, "bottom-right");
      })
      this.onChange(value);  
    }
    
  }
  onChange(value: any) {
    this.childEvent.emit(value);
  }
  
}
