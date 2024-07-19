import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersWebComponent } from './orders-web.component';

describe('OrdersWebComponent', () => {
  let component: OrdersWebComponent;
  let fixture: ComponentFixture<OrdersWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
