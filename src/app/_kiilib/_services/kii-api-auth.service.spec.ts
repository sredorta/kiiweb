import { TestBed } from '@angular/core/testing';

import { KiiApiAuthService } from './kii-api-auth.service';

describe('KiiApiAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiAuthService = TestBed.get(KiiApiAuthService);
    expect(service).toBeTruthy();
  });
});
