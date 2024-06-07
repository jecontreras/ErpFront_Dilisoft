import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArticuloComponent } from './form-articulo.component';

describe('FormArticuloComponent', () => {
  let component: FormArticuloComponent;
  let fixture: ComponentFixture<FormArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormArticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
