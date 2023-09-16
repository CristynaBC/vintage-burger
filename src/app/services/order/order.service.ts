import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://vintage-burger-api.vercel.app/orders';

  constructor(private http: HttpClient, private authService: AuthService) { } //permite usar o HttpClient para fazer chamadas HTTP para a API.
  cartItems: any[] = [];
  customerName: string = '';
  tableNumber: number | null = null;
  availableTable: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];

  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
  } 
  //O método addToCart(product: any) é responsável por adicionar o produto ao carrinho. Ele verifica se o produto já existe no carrinho. Se sim, incrementa a quantidade. Caso contrário, adiciona o produto com quantidade 1.

  getCartItems(): any[] {
    return this.cartItems;
  }

  saveCartItems(customerName: string, tableNumber: number): Observable<any> {
    if (this.cartItems.length === 0) {
      return of(null);
    }
  
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinutes = currentTime.getMinutes()
    const formattedTime = `${currentHour}:${currentMinutes}`
    const numericTime = currentTime.getTime()


    const orderData = {
      client: customerName,
      tableNumber: tableNumber,
      products: this.cartItems.map((item) => ({
        qty: item.quantity,
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
        },
      })),
      dateEntry: formattedTime,
      dateEntryData: currentTime,
      processingTime: '',
      status: "pendente",
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };

    return this.http.post<any>(`${this.apiUrl}`, orderData, httpOptions);
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getOrdersInProgress(): Observable<any[]> {
    const token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<any[]>(`${this.apiUrl}?status=pendente`, httpOptions);
  }
  getOrdersReady(): Observable<any[]> {
    const token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<any[]>(`${this.apiUrl}?status=pronto`, httpOptions);
  }

  updateOrder(orderId: number, updatedOrder: any): Observable<any> {
    const token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  
    return this.http.put<any>(`${this.apiUrl}/${orderId}`, updatedOrder, httpOptions);
  }
  
  getProcessedTime(order: any) {
    const currentTime = new Date().getTime()
    const orderTime = new Date(order.dateEntryData).getTime()
    const passedTime = currentTime - orderTime;
    const seconds = Math.floor(passedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const processingTime = `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    return processingTime
  }
  
  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  }
  }


