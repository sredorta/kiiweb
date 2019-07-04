import { TestBed } from '@angular/core/testing';

import { KiiApiAlertService } from './kii-api-alert.service';

describe('KiiApiAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiAlertService = TestBed.get(KiiApiAlertService);
    expect(service).toBeTruthy();
  });
});
