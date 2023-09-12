import { OrderService } from "src/app/services/order/order.service";
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  @Input() cartItems: any[] = [];
  customerName: string = '';
  tableNumber: number | null = null;
  availableTable: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(public orderService: OrderService) { }

  calculateTotal(): number {
    return this.orderService.calculateTotal();
  }

  increaseQuantity(index: number): void { 
    this.orderService.increaseQuantity(index);
  }

  decreaseQuantity(index: number): void {
    this.orderService.decreaseQuantity(index);
  }

  removeItem(index: number): void {
    this.orderService.removeItem(index);
  }

  placeOrder(customerName: string, tableNumber: number): void {
    if (!customerName || !tableNumber) {
      return;
    }
    this.orderService.saveCartItems(customerName, tableNumber).subscribe(
      (response) => {
        console.log('Pedido feito com sucesso!', response);
        this.orderService.clearCart();
      },
      (error) => {
        console.error('Erro ao fazer o pedido', error);
      }
    );
  }
}

