import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminSettingsFormComponent } from './kii-admin-settings-form.component';

describe('KiiAdminSettingsFormComponent', () => {
  let component: KiiAdminSettingsFormComponent;
  let fixture: ComponentFixture<KiiAdminSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminSettingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
