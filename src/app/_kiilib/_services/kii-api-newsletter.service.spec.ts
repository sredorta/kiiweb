import { TestBed } from '@angular/core/testing';

import { KiiApiNewsletterService } from './kii-api-newsletter.service';

describe('KiiApiNewsletterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiNewsletterService = TestBed.get(KiiApiNewsletterService);
    expect(service).toBeTruthy();
  });
});
