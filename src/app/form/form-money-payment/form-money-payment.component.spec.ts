import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMoneyPaymentComponent } from './form-money-payment.component';

describe('FormMoneyPaymentComponent', () => {
  let component: FormMoneyPaymentComponent;
  let fixture: ComponentFixture<FormMoneyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMoneyPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMoneyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
