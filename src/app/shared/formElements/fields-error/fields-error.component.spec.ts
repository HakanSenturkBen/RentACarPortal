import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsErrorComponent } from './fields-error.component';

describe('FieldsErrorComponent', () => {
  let component: FieldsErrorComponent;
  let fixture: ComponentFixture<FieldsErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldsErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
