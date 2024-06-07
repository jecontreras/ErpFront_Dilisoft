import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintarticulosComponent } from './printarticulos.component';

describe('PrintarticulosComponent', () => {
  let component: PrintarticulosComponent;
  let fixture: ComponentFixture<PrintarticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintarticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintarticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
