import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiResetPasswordFormComponent } from './kii-reset-password-form.component';

describe('KiiResetPasswordFormComponent', () => {
  let component: KiiResetPasswordFormComponent;
  let fixture: ComponentFixture<KiiResetPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiResetPasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiResetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
