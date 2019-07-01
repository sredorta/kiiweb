import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminEmailsComponent } from './kii-admin-emails.component';

describe('KiiAdminEmailsComponent', () => {
  let component: KiiAdminEmailsComponent;
  let fixture: ComponentFixture<KiiAdminEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
