import { TestBed } from '@angular/core/testing';

import { KiiMiscService } from './kii-misc.service';

describe('KiiMiscService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiMiscService = TestBed.get(KiiMiscService);
    expect(service).toBeTruthy();
  });
});
