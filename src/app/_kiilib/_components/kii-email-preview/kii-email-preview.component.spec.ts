import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiEmailPreviewComponent } from './kii-email-preview.component';

describe('KiiEmailPreviewComponent', () => {
  let component: KiiEmailPreviewComponent;
  let fixture: ComponentFixture<KiiEmailPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiEmailPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiEmailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
