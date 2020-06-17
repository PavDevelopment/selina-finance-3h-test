import { TestBed } from '@angular/core/testing';

import { MerchantTransationsService } from './merchant-transations.service';

describe('MerchantTransationsService', () => {
  let service: MerchantTransationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantTransationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
