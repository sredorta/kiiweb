import { TestBed } from '@angular/core/testing';

import { KiiSocketService } from './kii-socket.service';

describe('KiiSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiSocketService = TestBed.get(KiiSocketService);
    expect(service).toBeTruthy();
  });
});
