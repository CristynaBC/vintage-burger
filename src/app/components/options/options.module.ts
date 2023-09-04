import { OptionsComponent } from './options.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CommonsModule } from '../commons/commons.module';
import { WaiterComponent } from './waiter/waiter.component';
import { AdminComponent } from './admin/admin.component';
import { ChefComponent } from './chef/chef.component';


@NgModule({
  declarations: [
    OptionsComponent,
    WaiterComponent,
    AdminComponent,
    ChefComponent
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
