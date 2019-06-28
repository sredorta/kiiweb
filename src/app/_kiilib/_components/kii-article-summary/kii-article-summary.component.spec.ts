import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiArticleSummaryComponent } from './kii-article-summary.component';

describe('KiiArticleSummaryComponent', () => {
  let component: KiiArticleSummaryComponent;
  let fixture: ComponentFixture<KiiArticleSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiArticleSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiArticleSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
