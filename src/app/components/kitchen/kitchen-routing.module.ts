import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitchenCurrentComponent } from './kitchen-current/kitchen-current.component';
import { KitchenReadyComponent } from './kitchen-ready/kitchen-ready.component';

const routes: Routes = [
  {
    path: 'em-andamento',
    component: KitchenCurrentComponent
  },
  {
    path: 'pedidos-prontos',
    component: KitchenReadyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchenRoutingModule { }
