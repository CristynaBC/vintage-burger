import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
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
      declarations: [ProductsComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers:[
        { provide: AuthService, useValue: fakeAuthService }, Router, HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
