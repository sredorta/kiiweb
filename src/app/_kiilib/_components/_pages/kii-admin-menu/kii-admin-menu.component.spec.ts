import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminMenuComponent } from './kii-admin-menu.component';

describe('KiiAdminMenuComponent', () => {
  let component: KiiAdminMenuComponent;
  let fixture: ComponentFixture<KiiAdminMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
