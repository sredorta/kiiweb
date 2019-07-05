import { TestBed } from '@angular/core/testing';

import { KiiChatService } from './kii-chat.service';

describe('KiiChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiChatService = TestBed.get(KiiChatService);
    expect(service).toBeTruthy();
  });
});
