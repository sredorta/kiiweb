import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiVideoGalleryDialogComponent } from './kii-video-gallery-dialog.component';

describe('KiiVideoGalleryDialogComponent', () => {
  let component: KiiVideoGalleryDialogComponent;
  let fixture: ComponentFixture<KiiVideoGalleryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiVideoGalleryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiVideoGalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
