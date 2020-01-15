import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiArticleBrowserComponent } from './kii-article-browser.component';

describe('KiiArticleBrowserComponent', () => {
  let component: KiiArticleBrowserComponent;
  let fixture: ComponentFixture<KiiArticleBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiArticleBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiArticleBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
