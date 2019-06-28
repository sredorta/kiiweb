import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiArticleDetailComponent } from './kii-article-detail.component';

describe('KiiArticleDetailComponent', () => {
  let component: KiiArticleDetailComponent;
  let fixture: ComponentFixture<KiiArticleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiArticleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
