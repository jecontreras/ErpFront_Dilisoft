import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloDialogComponent } from './guia-pedidosweb.component';

describe('ArticuloDialogComponent', () => {
  let component: ArticuloDialogComponent;
  let fixture: ComponentFixture<ArticuloDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
