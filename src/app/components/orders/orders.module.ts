import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsComponent } from './options/options.component';
import { OrdersRoutingModule } from './orders-routing.module';


@NgModule({
  declarations: [
    OrdersComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
