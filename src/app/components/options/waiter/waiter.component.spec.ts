import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaiterComponent } from './waiter.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('WaiterComponent', () => {
  let component: WaiterComponent;
  let fixture: ComponentFixture<WaiterComponent>;
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
      declarations: [WaiterComponent],
      imports:[FormsModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers:[
        { provide: AuthService, useValue: fakeAuthService }, Router]
    });
    fixture = TestBed.createComponent(WaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
