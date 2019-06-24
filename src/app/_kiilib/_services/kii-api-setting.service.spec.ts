import { TestBed } from '@angular/core/testing';

import { KiiApiSettingService } from './kii-api-setting.service';

describe('KiiApiSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiApiSettingService = TestBed.get(KiiApiSettingService);
    expect(service).toBeTruthy();
  });
});
