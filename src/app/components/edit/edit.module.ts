import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { ProductsComponent } from './products/products.component';
import { CommonsModule } from '../commons/commons.module';
import { EmployeesComponent } from './employees/employees.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    CommonsModule,
    MatIconModule,
    FormsModule
  ]
})
export class EditModule { }
