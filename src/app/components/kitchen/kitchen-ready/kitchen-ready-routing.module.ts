import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitchenReadyComponent } from './kitchen-ready.component';

const routes: Routes = [
  {
    path: '',
    component: KitchenReadyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchenReadyRoutingModule { }
