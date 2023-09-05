import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {
    path: 'produtos',
    component: ProductsComponent
  },
  {
    path: 'funcionarios',
    component: EmployeesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
