import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminStatsComponent } from './kii-admin-stats.component';

describe('KiiAdminStatsComponent', () => {
  let component: KiiAdminStatsComponent;
  let fixture: ComponentFixture<KiiAdminStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
