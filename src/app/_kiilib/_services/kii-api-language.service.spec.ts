import { TestBed } from '@angular/core/testing';

import { KiiApiLanguageService } from './kii-api-language.service';

describe('KiiApiLanguageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiLanguageService = TestBed.get(KiiApiLanguageService);
    expect(service).toBeTruthy();
  });
});
