import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiArticleSummaryFormComponent } from './kii-article-summary-form.component';

describe('KiiArticleSummaryFormComponent', () => {
  let component: KiiArticleSummaryFormComponent;
  let fixture: ComponentFixture<KiiArticleSummaryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiArticleSummaryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiArticleSummaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
