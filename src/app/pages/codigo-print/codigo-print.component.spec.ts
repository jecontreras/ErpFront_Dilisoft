import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoPrintComponent } from './codigo-print.component';

describe('CodigoPrintComponent', () => {
  let component: CodigoPrintComponent;
  let fixture: ComponentFixture<CodigoPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
