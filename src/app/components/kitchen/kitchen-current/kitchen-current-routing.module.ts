import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitchenCurrentComponent } from './kitchen-current.component';


const routes: Routes = [
  {
    path: '',
    component: KitchenCurrentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchenCurrentRoutingModule { }
