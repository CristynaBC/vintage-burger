import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitchenReadyRoutingModule } from './kitchen-ready-routing.module';
import { KitchenReadyComponent } from './kitchen-ready.component';


@NgModule({
  declarations: [
    KitchenReadyComponent
  ],
  imports: [
    CommonModule,
    KitchenReadyRoutingModule
  ]
})
export class KitchenReadyModule { }
