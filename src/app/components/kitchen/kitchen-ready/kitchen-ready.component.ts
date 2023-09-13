import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';
@Component({
  selector: 'app-kitchen-ready',
  templateUrl: './kitchen-ready.component.html',
  styleUrls: ['./kitchen-ready.component.css'],
})
export class KitchenReadyComponent {
  role: string | null = null;
  ordersInProgress: any[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.orderService.getOrdersReady().subscribe((orders) => {
      this.ordersInProgress = orders;
      console.log(orders);
    });
  }
}
