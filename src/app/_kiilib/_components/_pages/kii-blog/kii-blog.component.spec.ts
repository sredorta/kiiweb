import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiBlogComponent } from './kii-blog.component';

describe('KiiBlogComponent', () => {
  let component: KiiBlogComponent;
  let fixture: ComponentFixture<KiiBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
