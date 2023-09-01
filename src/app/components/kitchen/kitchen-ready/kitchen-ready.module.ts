import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitchenReadyRoutingModule } from './kitchen-ready-routing.module';
import { KitchenReadyComponent } from './kitchen-ready.component';
import { CommonsModule } from '../../commons/commons.module';


@NgModule({
  declarations: [
    KitchenReadyComponent
  ],
  imports: [
    CommonModule,
    KitchenReadyRoutingModule,
    CommonsModule
  ]
})
export class KitchenReadyModule { }
