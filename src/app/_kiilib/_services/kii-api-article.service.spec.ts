import { TestBed } from '@angular/core/testing';

import { KiiApiArticleService } from './kii-api-article.service';

describe('KiiApiArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiArticleService = TestBed.get(KiiApiArticleService);
    expect(service).toBeTruthy();
  });
});
