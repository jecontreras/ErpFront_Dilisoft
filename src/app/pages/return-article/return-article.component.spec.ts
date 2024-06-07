import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnArticleComponent } from './return-article.component';

describe('ReturnArticleComponent', () => {
  let component: ReturnArticleComponent;
  let fixture: ComponentFixture<ReturnArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
