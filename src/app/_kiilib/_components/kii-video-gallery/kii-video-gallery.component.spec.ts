import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiVideoGalleryComponent } from './kii-video-gallery.component';

describe('KiiVideoGalleryComponent', () => {
  let component: KiiVideoGalleryComponent;
  let fixture: ComponentFixture<KiiVideoGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiVideoGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiVideoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
