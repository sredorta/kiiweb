import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminChatsComponent } from './kii-admin-chats.component';

describe('KiiAdminChatsComponent', () => {
  let component: KiiAdminChatsComponent;
  let fixture: ComponentFixture<KiiAdminChatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminChatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
