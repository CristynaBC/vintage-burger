import { TestBed } from '@angular/core/testing';

import { EmployeesService } from './employees.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(EmployeesService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
