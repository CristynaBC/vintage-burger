import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear(); // Limpa o localStorage após cada teste
  });

  it('should create the service', () => {
    expect(authService).toBeTruthy();
  });

  describe('saveToken', () => {
    it('should save and retrieve token from localStorage', () => {
      const token = 'mockToken';
      authService.saveToken(token);
      const retrievedToken = authService.getToken();
      expect(retrievedToken).toEqual(token);
    });
  });

  describe('getToken', () => {
    it('should return null if token is not in localStorage', () => {
      const retrievedToken = authService.getToken();
      expect(retrievedToken).toBeNull();
    });
  });

  describe('isLoggedIn', () => {
    it('should check if user is not logged in', () => {
      const isLoggedIn = authService.isLoggedIn();
      expect(isLoggedIn).toBeFalse();
    });
  });

  describe('saveRole', () => {
    it('should save and retrieve user role from localStorage', () => {
      const role = 'user';
      authService.saveRole(role);
      const retrievedRole = authService.getRole();
      expect(retrievedRole).toEqual(role);
    });
  });

  describe('Logout', () => {
    it('should remove token and role on logout', () => {
      const token = 'mockToken';
      const role = 'user';
      authService.saveToken(token);
      authService.saveRole(role);
      authService.logout();
      const retrievedToken = authService.getToken();
      const retrievedRole = authService.getRole();
      expect(retrievedToken).toBeNull();
      expect(retrievedRole).toBeNull();
    });
  });

  describe('login', () => {
    it('should send a POST request to the login API', () => {
      const email = 'test@example.com';
      const password = 'password';
      const expectedResponse = {
        accessToken: 'mockAccessToken',
        user: { role: 'user' },
      };

      authService.login(email, password).subscribe((response) => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpTestingController.expectOne(
        'https://vintage-burger-api.vercel.app/login'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email, password });

      req.flush(expectedResponse);
    });
  });
});
