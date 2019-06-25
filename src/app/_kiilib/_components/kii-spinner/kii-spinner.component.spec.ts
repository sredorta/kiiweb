import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiSpinnerComponent } from './kii-spinner.component';

describe('KiiSpinnerComponent', () => {
  let component: KiiSpinnerComponent;
  let fixture: ComponentFixture<KiiSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
