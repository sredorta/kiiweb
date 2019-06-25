import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiSignupFormComponent } from './kii-signup-form.component';

describe('KiiSignupFormComponent', () => {
  let component: KiiSignupFormComponent;
  let fixture: ComponentFixture<KiiSignupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiSignupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
