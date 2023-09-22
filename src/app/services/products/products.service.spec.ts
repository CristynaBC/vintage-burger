import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { AuthService } from '../auth/auth.service';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService, AuthService],
    });

    productsService = TestBed.inject(ProductsService);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the service', () => {
    expect(productsService).toBeTruthy();
  });

  describe('getProductsByType', () => {
    it('should get products by type', () => {
      const fakeToken = 'fakeToken';
      const fakeProductsByType = [{ name: 'suco' }, { name: 'refrigerante' }];
  
      spyOn(authService, 'getToken').and.returnValue(fakeToken);
  
      productsService.getProductsByType().subscribe((products) => {
        expect(products).toEqual(fakeProductsByType);
      });
  
      const req = httpTestingController.expectOne(
        'https://vintage-burger-api.vercel.app/products'
      );
  
      expect(req.request.method).toEqual('GET');
      expect(req.request.headers.get('Authorization')).toEqual(
        `Bearer ${fakeToken}`
      );
  
      req.flush(fakeProductsByType);
    });
  });
  
  describe('getProducts', () => {
    it('should get products', () => {
      const fakeProduct = 'café';

      spyOn(authService, 'getToken').and.returnValue(fakeProduct);

      productsService.getProducts().subscribe((products) => {
        expect(products).toEqual(fakeProduct);
      });

      const req = httpTestingController.expectOne(
        'https://vintage-burger-api.vercel.app/products'
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.headers.get('Authorization')).toEqual(
        `Bearer ${fakeProduct}`
      );

      req.flush(fakeProduct);
    });
  });

  describe('editProduct', () => {
    it('should edit the product', () => {
      const fakeToken = 'fakeToken';
      const fakeProduct = { id: 1, name:'hamburger'};

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      productsService.editProduct(fakeProduct).subscribe((hamburger) => {
        expect(hamburger).toEqual(fakeProduct);
      });

      const req = httpTestingController.expectOne(
        `https://vintage-burger-api.vercel.app/products/${fakeProduct.id}`
      );

      expect(req.request.method).toEqual('PATCH');
      expect(req.request.headers.get('Authorization')).toEqual(
        `Bearer ${fakeToken}`
      );
      expect(req.request.body).toEqual(fakeProduct);

      req.flush(fakeProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete the product', () => {
      const fakeToken = 'fakeToken';
      const fakeProduct = { id: 1, name: 'Café' };

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      productsService.deleteProduct(fakeProduct).subscribe(() => {
        expect(true).toBeTruthy();
      });

      const req = httpTestingController.expectOne(
        `https://vintage-burger-api.vercel.app/products/${fakeProduct.id}`
      );

      expect(req.request.method).toEqual('DELETE');
      expect(req.request.headers.get('Authorization')).toEqual(
        `Bearer ${fakeToken}`
      );

      // Simula uma resposta vazia
      req.flush({});
    });
  });

  describe('createProduct', () => {
    it('should create a new product', () => {
      const fakeToken = 'fakeToken';
      const fakeNewProduct = { name: 'café americano'};

      spyOn(authService, 'getToken').and.returnValue(fakeToken);

      productsService.createProduct(fakeNewProduct).subscribe((response) => {
        expect(response).toEqual(fakeNewProduct);
      });

      const req = httpTestingController.expectOne(`https://vintage-burger-api.vercel.app/products`);

      expect(req.request.method).toEqual('POST');
      expect(req.request.headers.get('Authorization')).toEqual(
        `Bearer ${fakeToken}`
      );

      req.flush(fakeNewProduct);
    });
  });
});
