import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { OrdersModule } from './components/orders/orders.module';
import { OptionsModule } from './components/options/options.module';
import { ProductsComponent } from './components/edit/products/products.component';
import { EmployeesComponent } from './components/edit/employees/employees.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/login/login.module').then( m => LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/options/options.module').then( m => OptionsModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./components/orders/orders.module').then( m => OrdersModule)
  },
  {
    path: 'produtos',component: ProductsComponent
  },
  {
    path: 'funcionarios',component: EmployeesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
