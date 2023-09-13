import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormLoginComponent } from './form-login.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

fdescribe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  let fakeAuthService: AuthService;

  beforeEach(async () => {
    fakeAuthService = jasmine.createSpyObj<AuthService>(
      'AuthService',
      {
        login:  of (Observable<any>),
        getToken: "test",
        isLoggedIn: true,
        getRole: "test",
        
      }
    );
    await TestBed.configureTestingModule({
      declarations: [FormLoginComponent],
      imports:[FormsModule],
      providers:[
        { provide: AuthService, useValue: fakeAuthService }, Router]
    });
    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
