import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { EmployeesComponent } from './employees/employees.component';


@NgModule({
  declarations: [
    ProductsComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EditModule
  ]
})
export class EditModule { }
