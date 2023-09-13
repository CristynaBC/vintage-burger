import { OrderService } from 'src/app/services/order/order.service';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-kitchen-current',
  templateUrl: './kitchen-current.component.html',
  styleUrls: ['./kitchen-current.component.css']
})
export class KitchenCurrentComponent {
  role: string | null = null;
  ordersInProgress: any[] = []
  constructor(
    private authService: AuthService,
    private orderService: OrderService
    ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.orderService.getOrdersInProgress().subscribe((orders) => {
    this.ordersInProgress = orders;
    console.log(orders)
    });

 }
 updateOrderStatus(order: any, newStatus: string): void {
  const processingTime = this.orderService.getProcessedTime(order)
  const updatedOrder = { ...order, status: newStatus, processingTime };
  this.orderService.updateOrder(order.id, updatedOrder).subscribe(
    () => {
      this.orderService.getOrdersInProgress().subscribe((orders) => {
        this.ordersInProgress = orders;
      });
    },
    (error) => {
      console.error('Erro ao atualizar o status do pedido', error);
    }
  );
}

}
