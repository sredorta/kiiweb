import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminDiskComponent } from './kii-admin-disk.component';

describe('KiiAdminDiskComponent', () => {
  let component: KiiAdminDiskComponent;
  let fixture: ComponentFixture<KiiAdminDiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminDiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminDiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
