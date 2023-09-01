import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitchenCurrentRoutingModule } from './kitchen-current-routing.module';
import { KitchenCurrentComponent } from './kitchen-current.component';
import { CommonsModule } from '../../commons/commons.module';

@NgModule({
  declarations: [
    KitchenCurrentComponent
  ],
  imports: [
    CommonModule,
    KitchenCurrentRoutingModule,
    CommonsModule,
  ]
})
export class KitchenCurrentModule { }
