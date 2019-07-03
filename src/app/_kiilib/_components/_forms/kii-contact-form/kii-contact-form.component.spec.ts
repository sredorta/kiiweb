import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiContactFormComponent } from './kii-contact-form.component';

describe('KiiContactFormComponent', () => {
  let component: KiiContactFormComponent;
  let fixture: ComponentFixture<KiiContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiContactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
