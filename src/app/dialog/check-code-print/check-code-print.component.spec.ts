import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCodePrintComponent } from './check-code-print.component';

describe('CheckCodePrintComponent', () => {
  let component: CheckCodePrintComponent;
  let fixture: ComponentFixture<CheckCodePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckCodePrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCodePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
