import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminPopupComponent } from './kii-admin-popup.component';

describe('KiiAdminPopupComponent', () => {
  let component: KiiAdminPopupComponent;
  let fixture: ComponentFixture<KiiAdminPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
