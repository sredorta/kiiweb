import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminSettingsComponent } from './kii-admin-settings.component';

describe('KiiAdminSettingsComponent', () => {
  let component: KiiAdminSettingsComponent;
  let fixture: ComponentFixture<KiiAdminSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
