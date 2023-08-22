import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsComponent } from '../options/options.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NewOrderComponent } from './new-order/new-order.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OptionsComponent,
    NewOrderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatIconModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
