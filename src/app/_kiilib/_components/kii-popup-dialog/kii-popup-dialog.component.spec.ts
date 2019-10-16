import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiPopupDialogComponent } from './kii-popup-dialog.component';

describe('KiiPopupDialogComponent', () => {
  let component: KiiPopupDialogComponent;
  let fixture: ComponentFixture<KiiPopupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiPopupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiPopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
