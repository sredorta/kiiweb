import { TestBed } from '@angular/core/testing';

import { KiiApiStatsService } from './kii-api-stats.service';

describe('KiiApiStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiStatsService = TestBed.get(KiiApiStatsService);
    expect(service).toBeTruthy();
  });
});
