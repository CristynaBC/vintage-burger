import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormsModule } from '@angular/forms';
import { LoginMessageComponent } from './login-message/login-message.component';



@NgModule({
  declarations: [
    LoginComponent,
    FormLoginComponent,
    LoginMessageComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
  ],
  exports: [
    LoginComponent,
    LoginMessageComponent
  ]
 
})
export class LoginModule { }
