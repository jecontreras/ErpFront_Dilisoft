import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReturnArticleComponent } from './form-return-article.component';

describe('FormReturnArticleComponent', () => {
  let component: FormReturnArticleComponent;
  let fixture: ComponentFixture<FormReturnArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReturnArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReturnArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
