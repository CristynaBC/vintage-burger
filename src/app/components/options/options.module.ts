import { OptionsComponent } from './options.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    OptionsComponent
  ],
  imports: [
    CommonModule,
    OptionsRoutingModule,
    MatIconModule
  ],
  exports: [
    OptionsComponent
  ]
})
export class OptionsModule { }
