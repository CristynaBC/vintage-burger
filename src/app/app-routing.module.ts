import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { OrdersModule } from './components/orders/orders.module';
import { OptionsModule } from './components/options/options.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/login/login.module').then( m => LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/options/options.module').then( m => OptionsModule)
  },
  {
    path: 'new-orders',
    loadChildren: () => import('./components/orders/orders.module').then( m => OrdersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
