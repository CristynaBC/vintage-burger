import { CommonsModule } from './../commons/commons.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenCurrentComponent } from './kitchen-current/kitchen-current.component';
import { KitchenReadyComponent } from './kitchen-ready/kitchen-ready.component';
import { KitchenRoutingModule } from './kitchen-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';



@NgModule({
  declarations: [
    KitchenCurrentComponent,
    KitchenReadyComponent
  ],
  imports: [
    CommonModule,
    KitchenRoutingModule,
    CommonsModule,
    MatIconModule
  ]
})
export class KitchenModule {
  role: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();

 }
}
