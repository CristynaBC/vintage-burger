import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderSummaryComponent } from './order-summary.component';
import { FormsModule } from '@angular/forms';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  let fakeOrderService: OrderService;

  beforeEach(async () => {

    (fakeOrderService = jasmine.createSpyObj('OrderService', [
      'calculateTotal',
      'increaseQuantity',
      'decreaseQuantity',
      'removeItem',
      'saveCartItems',
      'clearCart',
      'getCartItems'
    ]));

    await TestBed.configureTestingModule({
      declarations: [OrderSummaryComponent],
      imports: [FormsModule],
      providers: [{ provide: OrderService, useValue: fakeOrderService }],
    });
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
