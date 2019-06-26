import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiEmailValidateComponent } from './kii-email-validate.component';

describe('KiiEmailValidateComponent', () => {
  let component: KiiEmailValidateComponent;
  let fixture: ComponentFixture<KiiEmailValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiEmailValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiEmailValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
