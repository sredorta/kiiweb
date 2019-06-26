import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiConfirmDialogComponent } from './kii-confirm-dialog.component';

describe('KiiConfirmDialogComponent', () => {
  let component: KiiConfirmDialogComponent;
  let fixture: ComponentFixture<KiiConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
