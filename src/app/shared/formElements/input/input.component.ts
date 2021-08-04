import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, RadioControlValueAccessor, SelectMultipleControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{

    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }


  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input()
  public parentForm: FormGroup;

  @Input()
  public fieldName: string;

  @Input()
  public label: string;


  public value: string;
  public changed: (value: string) => void;
  public touched: () => void;
  public isDisable: boolean;

  get formField(): FormControl {
    return this.parentForm.get(this.fieldName) as FormControl;
  }

  constructor() { }
  public writeValue(value: string): void {
    this.value = value;

  }

  public onChange(event: Event): void {
    const value: string = (
      <HTMLInputElement>event.target).value;

    this.changed(value);

  }

  public registerOnChange(fn: any): void {
    this.changed = fn;

  }
  public registerOnTouched(fn: any): void {
    this.touched = fn;

  }

  public setDisabledState(isDisable: boolean): void {
    this.isDisable = isDisable;

  }


}