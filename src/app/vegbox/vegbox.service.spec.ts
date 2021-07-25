import { TestBed } from '@angular/core/testing';

import { VegboxService } from './vegbox.service';

describe('VegboxService', () => {
  let service: VegboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VegboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
