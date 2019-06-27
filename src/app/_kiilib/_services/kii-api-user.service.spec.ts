import { TestBed } from '@angular/core/testing';

import { KiiApiUserService } from './kii-api-user.service';

describe('KiiApiUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiUserService = TestBed.get(KiiApiUserService);
    expect(service).toBeTruthy();
  });
});
