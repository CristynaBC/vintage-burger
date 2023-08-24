import { OptionsComponent } from './options.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CommonsModule } from '../commons/commons.module';




@NgModule({
  declarations: [
    OptionsComponent
  ],
  imports: [
    CommonModule,
    OptionsRoutingModule,
    MatIconModule,
    CommonsModule
  
  ],
  exports: [
    OptionsComponent
  ]
})
export class OptionsModule { }
