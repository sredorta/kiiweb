import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiStatsIndicatorComponent } from './kii-stats-indicator.component';

describe('KiiStatsIndicatorComponent', () => {
  let component: KiiStatsIndicatorComponent;
  let fixture: ComponentFixture<KiiStatsIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiStatsIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiStatsIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
