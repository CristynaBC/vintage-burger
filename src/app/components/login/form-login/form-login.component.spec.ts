import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormLoginComponent } from './form-login.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { OptionsModule } from '../../options/options.module';

fdescribe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  let fakeAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;

  const routes: Routes = [
    { path: 'home', component: OptionsModule },
  ];

  beforeEach(async () => {
    fakeAuthService = jasmine.createSpyObj('AuthService', {
      login: of({ accessToken: 'mockAccessToken', user: { role: 'user' } }),
      saveToken: undefined,
      saveRole: undefined,
    });

    TestBed.configureTestingModule({
      declarations: [FormLoginComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
      ]
    });

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful login', fakeAsync(() => {
    const routerSpy = spyOn(router,'navigate')
    component.email = 'test@example.com';
    component.password = 'password';
    component.onSubmit();

    tick();

    expect(fakeAuthService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(fakeAuthService.saveToken).toHaveBeenCalledWith('mockAccessToken');
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  }));

  it('should handle login with invalid credentials', fakeAsync(() => {
    fakeAuthService.login.and.returnValue(
      throwError({ status: 401, error: 'Credenciais inválidas. Verifique seu e-mail e senha.' })
    );

    component.email = 'invalid@example.com';
    component.password = 'invalidPassword';
    component.onSubmit();

    tick();

    expect(component.loginError).toBeTrue();
    expect(component.errorMessage).toBe('Credenciais inválidas. Verifique seu e-mail e senha.');
  }));

  it('should handle login error', fakeAsync(() => {
    fakeAuthService.login.and.returnValue(
      throwError('Network error')
    );

    component.email = 'test@example.com';
    component.password = 'password';
    component.onSubmit();

    tick();

    expect(component.loginError).toBeTrue();
    expect(component.errorMessage).toBe('Credenciais inválidas. Verifique seu e-mail e senha.');
  }));
});
