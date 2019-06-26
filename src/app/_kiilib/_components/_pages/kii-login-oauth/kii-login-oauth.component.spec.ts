import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiLoginOauthComponent } from './kii-login-oauth.component';

describe('KiiLoginOauthComponent', () => {
  let component: KiiLoginOauthComponent;
  let fixture: ComponentFixture<KiiLoginOauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiLoginOauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiLoginOauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
