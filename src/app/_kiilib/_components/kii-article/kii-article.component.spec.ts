import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiArticleComponent } from './kii-article.component';

describe('KiiArticleComponent', () => {
  let component: KiiArticleComponent;
  let fixture: ComponentFixture<KiiArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
