import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiLinkDialogComponent } from './kii-link-dialog.component';

describe('KiiLinkDialogComponent', () => {
  let component: KiiLinkDialogComponent;
  let fixture: ComponentFixture<KiiLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiLinkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
