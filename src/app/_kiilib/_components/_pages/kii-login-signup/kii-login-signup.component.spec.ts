import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiLoginSignupComponent } from './kii-login-signup.component';

describe('KiiLoginSignupComponent', () => {
  let component: KiiLoginSignupComponent;
  let fixture: ComponentFixture<KiiLoginSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiLoginSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiLoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
