import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiChatDialogComponent } from './kii-chat-dialog.component';

describe('KiiChatDialogComponent', () => {
  let component: KiiChatDialogComponent;
  let fixture: ComponentFixture<KiiChatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiChatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiChatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
