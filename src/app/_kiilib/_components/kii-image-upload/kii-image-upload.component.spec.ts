import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiImageUploadComponent } from './kii-image-upload.component';

describe('KiiImageUploadComponent', () => {
  let component: KiiImageUploadComponent;
  let fixture: ComponentFixture<KiiImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
