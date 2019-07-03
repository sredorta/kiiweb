import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiContactComponent } from './kii-contact.component';

describe('KiiContactComponent', () => {
  let component: KiiContactComponent;
  let fixture: ComponentFixture<KiiContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
