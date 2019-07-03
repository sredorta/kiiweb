import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiGmapComponent } from './kii-gmap.component';

describe('KiiGmapComponent', () => {
  let component: KiiGmapComponent;
  let fixture: ComponentFixture<KiiGmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiGmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiGmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
