import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OptionsComponent } from './options.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable,of } from 'rxjs';
import { Router } from '@angular/router';


describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;
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
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [OptionsComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers:[
        { provide: AuthService, useValue: fakeAuthService }, Router]
    });
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});