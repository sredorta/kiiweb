import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiIconDialogComponent } from './kii-icon-dialog.component';

describe('KiiIconDialogComponent', () => {
  let component: KiiIconDialogComponent;
  let fixture: ComponentFixture<KiiIconDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiIconDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiIconDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
