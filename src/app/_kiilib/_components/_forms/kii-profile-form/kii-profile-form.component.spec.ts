import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiProfileFormComponent } from './kii-profile-form.component';

describe('KiiProfileFormComponent', () => {
  let component: KiiProfileFormComponent;
  let fixture: ComponentFixture<KiiProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiProfileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
