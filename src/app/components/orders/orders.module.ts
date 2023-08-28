import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CommonsModule } from '../commons/commons.module';

@NgModule({
  declarations: [
    OrdersComponent,
    NewOrdersComponent,
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CommonsModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
