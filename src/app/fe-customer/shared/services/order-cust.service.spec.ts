import { TestBed } from '@angular/core/testing';

import { OrderCustService } from './order-cust.service';

describe('OrderCustService', () => {
  let service: OrderCustService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderCustService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
