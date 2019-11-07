import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiNewsletterComponent } from './kii-newsletter.component';

describe('KiiNewsletterComponent', () => {
  let component: KiiNewsletterComponent;
  let fixture: ComponentFixture<KiiNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
