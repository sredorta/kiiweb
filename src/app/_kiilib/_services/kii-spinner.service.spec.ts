import { TestBed } from '@angular/core/testing';

import { KiiSpinnerService } from './kii-spinner.service';

describe('KiiSpinnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiSpinnerService = TestBed.get(KiiSpinnerService);
    expect(service).toBeTruthy();
  });
});
