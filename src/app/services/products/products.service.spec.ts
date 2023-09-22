import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
