import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiFillSideComponent } from './kii-fill-side.component';

describe('KiiFillSideComponent', () => {
  let component: KiiFillSideComponent;
  let fixture: ComponentFixture<KiiFillSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiFillSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiFillSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
