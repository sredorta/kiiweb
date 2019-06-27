import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminUsersComponent } from './kii-admin-users.component';

describe('KiiAdminUsersComponent', () => {
  let component: KiiAdminUsersComponent;
  let fixture: ComponentFixture<KiiAdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
