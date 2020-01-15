import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiArticleSsrComponent } from './kii-article-ssr.component';

describe('KiiArticleSsrComponent', () => {
  let component: KiiArticleSsrComponent;
  let fixture: ComponentFixture<KiiArticleSsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiArticleSsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiArticleSsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
