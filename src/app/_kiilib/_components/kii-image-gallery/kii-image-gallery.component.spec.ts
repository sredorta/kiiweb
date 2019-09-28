import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiImageGalleryComponent } from './kii-image-gallery.component';

describe('KiiImageGalleryComponent', () => {
  let component: KiiImageGalleryComponent;
  let fixture: ComponentFixture<KiiImageGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiImageGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
