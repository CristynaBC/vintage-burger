import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsService } from 'src/app/services/products/products.service';
import { OrderService } from 'src/app/services/order/order.service';
import { NewOrdersComponent } from './new-orders.component';
import { Observable, of } from 'rxjs';


describe('NewOrdersComponent', () => {
  let component: NewOrdersComponent;
  let fixture: ComponentFixture<NewOrdersComponent>;
  let fakeProductsService: ProductsService;
  let fakeOrderService: OrderService;

  beforeEach(async () => {
    (fakeProductsService = jasmine.createSpyObj<ProductsService>(
      'ProductsService',
      {
        getProducts: of([]),
      }
    )),
      (fakeOrderService = jasmine.createSpyObj('OrderService', ['addToCart']));

    await TestBed.configureTestingModule({
      declarations: [NewOrdersComponent],
      providers: [
        { provide: ProductsService, useValue: fakeProductsService },
        { provide: OrderService, useValue: fakeOrderService }],
    });
    fixture = TestBed.createComponent(NewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
