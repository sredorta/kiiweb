import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminAlertsComponent } from './kii-admin-alerts.component';

describe('KiiAdminAlertsComponent', () => {
  let component: KiiAdminAlertsComponent;
  let fixture: ComponentFixture<KiiAdminAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
