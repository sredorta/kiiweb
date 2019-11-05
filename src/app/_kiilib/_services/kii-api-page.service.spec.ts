import { TestBed } from '@angular/core/testing';

import { KiiApiPageService } from './kii-api-page.service';

describe('KiiApiPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiPageService = TestBed.get(KiiApiPageService);
    expect(service).toBeTruthy();
  });
});
