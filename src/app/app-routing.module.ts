import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { OrdersModule } from './components/orders/orders.module';
import { OptionsModule } from './components/options/options.module';
import { KitchenCurrentModule } from './components/kitchen/kitchen-current/kitchen-current.module';
import { KitchenReadyModule } from './components/kitchen/kitchen-ready/kitchen-ready.module';

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
    path: 'em-andamento',
    loadChildren: () => import('./components/kitchen/kitchen-current/kitchen-current.module').then( m => KitchenCurrentModule)
  },
  {
    path: 'pedidos-prontos',
    loadChildren: () => import('./components/kitchen/kitchen-ready/kitchen-ready.module').then( m => KitchenReadyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
