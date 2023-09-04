import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { AdminComponent } from './components/options/admin/admin.component';
import { OrdersModule } from './components/orders/orders.module';
import { WaiterComponent } from './components/options/waiter/waiter.component';
import { OptionsModule } from './components/options/options.module';
import { ChefComponent } from './components/options/chef/chef.component';

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
  { path: 'garçom', component: WaiterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'chef', component: ChefComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
