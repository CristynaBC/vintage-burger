import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenCurrentComponent } from './kitchen-current.component';
import { KitchenCurrentRoutingModule } from './kitchen-current-routing.module';



@NgModule({
  declarations: [
    KitchenCurrentComponent
  ],
  imports: [
    CommonModule,
    KitchenCurrentRoutingModule
  
  ]
})
export class KitchenCurrentModule { }
