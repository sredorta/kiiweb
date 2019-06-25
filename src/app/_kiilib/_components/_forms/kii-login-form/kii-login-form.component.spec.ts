import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiLoginFormComponent } from './kii-login-form.component';

describe('KiiLoginFormComponent', () => {
  let component: KiiLoginFormComponent;
  let fixture: ComponentFixture<KiiLoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiLoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
