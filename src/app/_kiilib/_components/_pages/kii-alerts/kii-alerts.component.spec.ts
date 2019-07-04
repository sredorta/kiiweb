import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAlertsComponent } from './kii-alerts.component';

describe('KiiAlertsComponent', () => {
  let component: KiiAlertsComponent;
  let fixture: ComponentFixture<KiiAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
