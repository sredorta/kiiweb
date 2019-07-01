import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiEmailNewFormComponent } from './kii-email-new-form.component';

describe('KiiEmailNewFormComponent', () => {
  let component: KiiEmailNewFormComponent;
  let fixture: ComponentFixture<KiiEmailNewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiEmailNewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiEmailNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
