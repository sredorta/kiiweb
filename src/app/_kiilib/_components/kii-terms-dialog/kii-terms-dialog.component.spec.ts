import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiTermsDialogComponent } from './kii-terms-dialog.component';

describe('KiiTermsDialogComponent', () => {
  let component: KiiTermsDialogComponent;
  let fixture: ComponentFixture<KiiTermsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiTermsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiTermsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
