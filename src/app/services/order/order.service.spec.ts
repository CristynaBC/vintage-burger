import { AuthService } from './../auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('OrderService', () => {
  let orderService: OrderService;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService, AuthService],
    });

    orderService = TestBed.inject(OrderService);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.verify(); //limpa solicitações pendentes antes de cada teste
  });

  describe('addToCart', () => {
    it('should add a product to the cart', () => {
      const productToAdd = { id: 1, name: 'sanduíche', price: 10 };

      orderService.addToCart(productToAdd);

      const cartItems = orderService.getCartItems();
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].id).toBe(productToAdd.id);
      expect(cartItems[0].name).toBe(productToAdd.name);
      expect(cartItems[0].price).toBe(productToAdd.price);
      expect(cartItems[0].quantity).toBe(1);
    });

    it('should increment quantity if the product is already in the cart', () => {
      const productToAdd = { id: 1, name: 'sanduíche', price: 10 };

      orderService.addToCart(productToAdd);
      orderService.addToCart(productToAdd);

      const cartItems = orderService.getCartItems();
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].quantity).toBe(2);
    });

    describe('getCartItems', () => {
      describe('getCartItems', () => {
        it('should return an empty array if the cart is empty', () => {
          const cartItems = orderService.getCartItems();

          expect(cartItems).toEqual([]);
        });
        it('should get the cart items', () => {
          const fakeItem = { id: 1, name: 'sanduíche', price: 10, quantity: 1 };

          orderService.addToCart(fakeItem);

          const cartItems = orderService.getCartItems();

          expect(cartItems.length).toBe(1);
          expect(cartItems).toContain(fakeItem);
        });
      });
    });
  });

  describe('saveCartItems', () => {
    it('should save the cart items when the cart is not empty', () => {
      const customerName = 'Giovana';
      const tableNumber = 5;
      const fakeToken = 'fakeToken';
      const fakeCartItems = [
        { id: 1, name: 'sanduíche', price: 10, quantity: 2 },
        { id: 2, name: 'café', price: 5, quantity: 1 },
      ];

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      // Adicionando itens ao carrinho
      fakeCartItems.forEach((item) => {
        orderService.addToCart(item);
      });

      // Adicionando o mesmo item novamente para simular a adição de quantidade
      orderService.addToCart(fakeCartItems[0]);

      const expectedResponse = {
        client: customerName,
        tableNumber: tableNumber,
        products: fakeCartItems.map((item) => ({
          qty: item.quantity,
          product: {
            id: item.id,
            name: item.name,
            price: item.price,
          },
        })),
        dateEntry: jasmine.any(String),
        dateEntryData: jasmine.any(Date),
        processingTime: '',
        status: 'pendente',
      };

      orderService
        .saveCartItems(customerName, tableNumber)
        .subscribe((response) => {
          expect(response).toEqual(expectedResponse);
        });

      const req = httpTestingController.expectOne(
        'https://vintage-burger-api.vercel.app/orders'
      );

      expect(req.request.method).toEqual('POST');
      expect(req.request.headers.get('Authorization')).toEqual(
        `Bearer ${fakeToken}`
      );

      expect(req.request.body.client).toEqual(customerName);
      expect(req.request.body.tableNumber).toEqual(tableNumber);
      expect(req.request.body.products).toEqual(
        fakeCartItems.map((item) => ({
          qty: item.quantity,
          product: {
            id: item.id,
            name: item.name,
            price: item.price,
          },
        }))
      );
      req.flush(expectedResponse);
    });

    it('should return null when the cart is empty', () => {
      const customerName = 'Claudia';
      const tableNumber = 5;
      const fakeToken = 'fakeToken';

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      const response = orderService.saveCartItems(customerName, tableNumber);

      response.subscribe((result) => {
        expect(result).toBeNull();
      });
    });
  });

  describe('clearCart', () => {
    it('should clear the cart', () => {
      const fakeItems = [
        { id: 1, name: 'sanduíche', price: 10, quantity: 2 },
        { id: 2, name: 'café', price: 5, quantity: 1 },
      ];

      fakeItems.forEach((item) => {
        orderService.addToCart(item);
      });

      // Chamando a função clearCart para limpar o carrinho
      orderService.clearCart();

      // Obtendo os itens do carrinho após a limpeza
      const cartItems = orderService.getCartItems();

      // Verificando se o carrinho está vazio
      expect(cartItems.length).toBe(0);
    });
  });

  describe('getOrdersInProgress', () => {
    it('should get the orders that are in progress', () => {
      const fakeToken = 'fakeToken';
      const fakeOrders = [
        { id: 1, status: 'pendente' },
        { id: 2, status: 'pendente' },
      ];

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      orderService.getOrdersInProgress().subscribe((orders) => {
        expect(orders).toEqual(fakeOrders);
      });

      const req = httpTestingController.expectOne(
        `https://vintage-burger-api.vercel.app/orders?status=pendente`
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(
        `Bearer ${fakeToken}`
      );

      req.flush(fakeOrders);
    });
  });

  describe('getOrdersReady', () => {
    it('should get the orders that are ready', () => {
      const fakeToken = 'fakeToken';
      const fakeOrders2 = [
        { id: 3, status: 'pronto' },
        { id: 4, status: 'pronto' },
      ];

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      orderService.getOrdersInProgress().subscribe((orders) => {
        expect(orders).toEqual(fakeOrders2);
      });

      const req = httpTestingController.expectOne(
        `https://vintage-burger-api.vercel.app/orders?status=pendente` //verificar
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(
        `Bearer ${fakeToken}`
      );

      req.flush(fakeOrders2);
    });
  });

  describe('updateOrder', () => {
    it('should update the status of the orders', () => {
      const fakeToken = 'fakeToken';

      const fakeOrderInProgress = { id: 5, status: 'pendente' };

      const fakeOrderReady = { ...fakeOrderInProgress, status: 'pronto' };

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      orderService.addToCart(fakeOrderInProgress);

      orderService
        .updateOrder(fakeOrderInProgress.id, fakeOrderReady)
        .subscribe(() => {
          orderService.getOrdersInProgress().subscribe((orders) => {
            expect(orders).not.toContain(fakeOrderInProgress);
            expect(orders).toContain(fakeOrderReady);
          });
        });

      const req = httpTestingController.expectOne(
        `https://vintage-burger-api.vercel.app/orders/5`
      );

      expect(req.request.method).toBe('PUT');
      expect(req.request.headers.get('Authorization')).toBe(
        `Bearer ${fakeToken}`
      );
      expect(req.request.body).toEqual(fakeOrderReady);
      req.flush(fakeOrderReady);
    });
  });

  describe('getProcessedTime', () => {
    it('should get the time the order was placed', () => {
      const fakeOrder = {
        dateEntryData: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
      };

      const processingTime = orderService.getProcessedTime(fakeOrder);

      expect(processingTime).toBe('0h 5m 0s');
    });
  });

  describe('increaseQuantity', () => {
    it('should increase the quantity of a product in the cart', () => {
      const fakeCartItem = { id: 1, name: 'sanduíche', price: 10, quantity: 1 };

      orderService.addToCart(fakeCartItem);

      orderService.increaseQuantity(0); // Supondo que o item está no índice 0

      // O carrinho atualizado após o aumento da quantidade:
      const updatedCartItems = orderService.getCartItems();

      // Vericando se a quantidade do item no carrinho foi aumentada para 2
      expect(updatedCartItems[0].quantity).toBe(2);
    });
  });

  describe('decreaseQuantity', () => {
    it('should decrease the quantity of a product in the cart', () => {
      const fakeCartItem = { id: 2, name: 'café', price: 2, quantity: 1 };

      orderService.addToCart(fakeCartItem);

      orderService.decreaseQuantity(0);

      const updatedCartItems = orderService.getCartItems();

      // Vericando se a quantidade do item no carrinho foi aumentada para 2
      expect(updatedCartItems[0].quantity).toBe(1);
    });
  });

  describe('removeItem', () => {
    it('should remove a specified item from the cart', () => {
      const fakeCartItems = [
        { id: 1, name: 'sanduíche', price: 10, quantity: 2 },
        { id: 2, name: 'café', price: 5, quantity: 1 },
        { id: 3, name: 'batata frita', price: 8, quantity: 3 },
      ];

      // Adicionando os itens ao carrinho
      fakeCartItems.forEach((item) => {
        orderService.addToCart(item);
      });
      // A função removeItem remove um item específico
      const indexToRemove = 1;
      orderService.removeItem(indexToRemove);

      const updatedCartItems = orderService.getCartItems();

      // Verificando se o item no índice 1 foi removido corretamente do carrinho
      expect(updatedCartItems.length).toBe(fakeCartItems.length - 1); // O carrinho deve ter um item a menos agora
    });
  });

  describe('calculateTotal',() => {
    it('should calculate the total price of items in the cart', () => {
      const fakeCartItems = [
        { id: 1, name: 'sanduíche', price: '10', quantity: 1 },
        { id: 2, name: 'café', price: '5', quantity: 1 },
      ];

      fakeCartItems.forEach((item) => {
        orderService.addToCart(item);
      });

      const total = orderService.calculateTotal();

      expect(total).toBe(15);
    })
  })
});
