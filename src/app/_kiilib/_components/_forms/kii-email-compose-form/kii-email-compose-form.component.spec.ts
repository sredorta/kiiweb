import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiEmailComposeFormComponent } from './kii-email-compose-form.component';

describe('KiiEmailComposeFormComponent', () => {
  let component: KiiEmailComposeFormComponent;
  let fixture: ComponentFixture<KiiEmailComposeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiEmailComposeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiEmailComposeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
