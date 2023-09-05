import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenCurrentComponent } from './kitchen-current/kitchen-current.component';
import { KitchenReadyComponent } from './kitchen-ready/kitchen-ready.component';
import { KitchenRoutingModule } from './kitchen-routing.module';



@NgModule({
  declarations: [
    KitchenCurrentComponent,
    KitchenReadyComponent
  ],
  imports: [
    CommonModule,
    KitchenRoutingModule
  ]
})
export class KitchenModule { }
