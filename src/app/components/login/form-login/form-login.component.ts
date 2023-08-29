import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})

export class FormLoginComponent {
  email = ''
  password = ''
  loginError = false;
  errorMessage = '';

   constructor(private authService: AuthService, private router: Router) {} //injeção de dependencia do service auth
  
  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const token = response.accessToken;
        const role = response.user.role

        this.authService.saveRole(role)
        console.log(role)
        this.authService.saveToken(token)  //chama o método saveToken do auth service
        
        this.router.navigate(['/home'])
      },
      (error) => {
        console.error('Erro no login', error)
        this.loginError = true;
        this.errorMessage = 'Credenciais inválidas. Verifique seu e-mail e senha.';
      }
    )
    }
   
    
}


/*
exemplo de credencial para testar:

  "email": "anita.borg@systers.xyz",
  "password": "123456" 
*/
