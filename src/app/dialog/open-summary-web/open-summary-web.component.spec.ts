import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSummaryWebComponent } from './open-summary-web.component';

describe('OpenSummaryWebComponent', () => {
  let component: OpenSummaryWebComponent;
  let fixture: ComponentFixture<OpenSummaryWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenSummaryWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSummaryWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
