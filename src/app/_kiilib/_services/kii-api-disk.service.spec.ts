import { TestBed } from '@angular/core/testing';

import { KiiApiDiskService } from './kii-api-disk.service';

describe('KiiApiDiskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiDiskService = TestBed.get(KiiApiDiskService);
    expect(service).toBeTruthy();
  });
});
