import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiChatComponent } from './kii-chat.component';

describe('KiiChatComponent', () => {
  let component: KiiChatComponent;
  let fixture: ComponentFixture<KiiChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
