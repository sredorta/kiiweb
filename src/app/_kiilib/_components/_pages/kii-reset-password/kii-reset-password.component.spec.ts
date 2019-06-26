import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiResetPasswordComponent } from './kii-reset-password.component';

describe('KiiResetPasswordComponent', () => {
  let component: KiiResetPasswordComponent;
  let fixture: ComponentFixture<KiiResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
