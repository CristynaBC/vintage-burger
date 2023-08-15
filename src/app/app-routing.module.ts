import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then( m => HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
