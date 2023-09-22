import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeesService } from './employees.service';
import { AuthService } from '../auth/auth.service';

describe('EmployeesService', () => {
  let employeesService: EmployeesService;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeesService, AuthService],
    });

    employeesService = TestBed.inject(EmployeesService);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the service', () => {
    expect(employeesService).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should get users', () => {
      const fakeToken = 'fakeToken';
      const fakeUsers = [
        { id: 1, name: 'Ana' },
        { id: 2, name: 'Maria' },
      ];

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      employeesService.getUsers().subscribe((users) => {
        expect(users).toEqual(fakeUsers);
      });

      const req = httpTestingController.expectOne(
        'https://vintage-burger-api.vercel.app/users'
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.headers.get('Authorization')).toEqual(
        `Bearer ${fakeToken}`
      );

      req.flush(fakeUsers);
    });
  });

  describe('editUser', () => {
    it('should edit the users', () => {
      const fakeToken = 'fakeToken';
      const fakeUser = { id: 1, name: 'Maria' };

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      employeesService.editUser(fakeUser).subscribe((Maria) => {
        expect(Maria).toEqual(fakeUser);
      });
      const req = httpTestingController.expectOne(
        `https://vintage-burger-api.vercel.app/users/${fakeUser.id}`
      );

      expect(req.request.method).toEqual('PATCH');
      expect(req.request.headers.get('Authorization')).toEqual(
        `Bearer ${fakeToken}`
      );
      expect(req.request.body).toEqual(fakeUser);

      req.flush(fakeUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete the users', () => {
      const fakeToken = 'fakeToken';
      const fakeUser = { id: 1, name: 'Maria' };

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      employeesService.deleteUser(fakeUser).subscribe(() => {
        expect(true).toBeTruthy();
      });
      const req = httpTestingController.expectOne(
        `https://vintage-burger-api.vercel.app/users/${fakeUser.id}`
      );

      expect(req.request.method).toEqual('DELETE');
      expect(req.request.headers.get('Authorization')).toEqual(
        `Bearer ${fakeToken}`
      );
    // Simula uma resposta vazia
    req.flush({});
    });
  });

  describe('createUser', () => {
    it('should create new users', () => {
      const fakeToken = 'fakeToken';
      const fakeNewUser = { name: 'Ana', email: 'ana@example.com' };

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      employeesService.createUser(fakeNewUser).subscribe((response) => {
        expect(response).toEqual(fakeNewUser)
      });
      const req = httpTestingController.expectOne(`https://vintage-burger-api.vercel.app/users`);

      expect(req.request.method).toEqual('POST');
      expect(req.request.headers.get('Authorization')).toEqual(
        `Bearer ${fakeToken}`
      );
    req.flush(fakeNewUser);
    });
  });
});
