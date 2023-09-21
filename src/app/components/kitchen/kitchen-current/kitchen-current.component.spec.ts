import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KitchenCurrentComponent } from './kitchen-current.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Observable, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('KitchenCurrentComponent', () => {
  let component: KitchenCurrentComponent;
  let fixture: ComponentFixture<KitchenCurrentComponent>;
  let fakeAuthService: AuthService;
  let fakeOrderService: OrderService;

  beforeEach(async() => {
    fakeAuthService = jasmine.createSpyObj<AuthService>(
      'AuthService',
      {
        login:  of (Observable<any>),
        getToken: "test",
        isLoggedIn: true,
        getRole: "test",
        
      }
    );
    fakeOrderService = jasmine.createSpyObj<OrderService>('OrderService', {
      getOrdersInProgress: of([]), 
      updateOrder: of({}),
    });
    
    await TestBed.configureTestingModule({
      declarations: [KitchenCurrentComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: OrderService, useValue: fakeOrderService },
      ],
    })
    fixture = TestBed.createComponent(KitchenCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
