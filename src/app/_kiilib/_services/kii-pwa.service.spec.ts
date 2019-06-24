import { TestBed } from '@angular/core/testing';

import { KiiPwaService } from './kii-pwa.service';

describe('KiiPwaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiPwaService = TestBed.get(KiiPwaService);
    expect(service).toBeTruthy();
  });
});
