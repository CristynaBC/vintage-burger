import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { OrdersModule } from './components/orders/orders.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/login/login.module').then( m => LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/orders/orders.module').then( m => OrdersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
