import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiSpinnerOverlayComponent } from './kii-spinner-overlay.component';

describe('KiiSpinnerOverlayComponent', () => {
  let component: KiiSpinnerOverlayComponent;
  let fixture: ComponentFixture<KiiSpinnerOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiSpinnerOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiSpinnerOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
