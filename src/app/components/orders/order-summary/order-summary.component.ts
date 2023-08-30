import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  @Input() cartItems: any[] = [];

  constructor(public cartService: CartService) { }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  increaseQuantity(index: number): void { 
    this.cartService.increaseQuantity(index);
  }

  decreaseQuantity(index: number): void {
    this.cartService.decreaseQuantity(index);
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
  }
}

