import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(OrderService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
