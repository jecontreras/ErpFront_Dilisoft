import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaPedidoswebComponent } from './guia-pedidosweb.component';

describe('GuiaPedidoswebComponent', () => {
  let component: GuiaPedidoswebComponent;
  let fixture: ComponentFixture<GuiaPedidoswebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiaPedidoswebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaPedidoswebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
