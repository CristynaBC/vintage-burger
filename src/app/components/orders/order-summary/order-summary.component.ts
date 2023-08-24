import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  @Input() cartItems: any[] = [];

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }
}
