import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiEmailEditFormComponent } from './kii-email-edit-form.component';

describe('KiiEmailEditFormComponent', () => {
  let component: KiiEmailEditFormComponent;
  let fixture: ComponentFixture<KiiEmailEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiEmailEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiEmailEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
