import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyPaymentComponent } from './money-payment.component';

describe('MoneyPaymentComponent', () => {
  let component: MoneyPaymentComponent;
  let fixture: ComponentFixture<MoneyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
