import { TestBed } from '@angular/core/testing';

import { KiiApiEmailService } from './kii-api-email.service';

describe('KiiApiEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiEmailService = TestBed.get(KiiApiEmailService);
    expect(service).toBeTruthy();
  });
});
