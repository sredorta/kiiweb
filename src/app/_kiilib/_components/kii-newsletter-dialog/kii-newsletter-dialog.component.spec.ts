import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiNewsletterDialogComponent } from './kii-newsletter-dialog.component';

describe('KiiNewsletterDialogComponent', () => {
  let component: KiiNewsletterDialogComponent;
  let fixture: ComponentFixture<KiiNewsletterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiNewsletterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiNewsletterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
