import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiImageGalleryDialogComponent } from './kii-image-gallery-dialog.component';

describe('KiiImageGalleryDialogComponent', () => {
  let component: KiiImageGalleryDialogComponent;
  let fixture: ComponentFixture<KiiImageGalleryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiImageGalleryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiImageGalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
