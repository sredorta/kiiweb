import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiShareComponent } from './kii-share.component';

describe('KiiShareComponent', () => {
  let component: KiiShareComponent;
  let fixture: ComponentFixture<KiiShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
