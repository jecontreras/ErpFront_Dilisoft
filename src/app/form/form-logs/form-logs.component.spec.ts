import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLogsComponent } from './form-logs.component';

describe('FormLogsComponent', () => {
  let component: FormLogsComponent;
  let fixture: ComponentFixture<FormLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
