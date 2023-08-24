import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { OptionsComponent } from '../options/options.component';
import { OrdersRoutingModule } from './orders-routing.module';
// import { MatIconModule } from '@angular/material/icon';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  declarations: [
    OrdersComponent,
    // OptionsComponent, //verificar
    NewOrdersComponent,
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    // MatIconModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
