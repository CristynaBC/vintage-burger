import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-message',
  templateUrl: './login-message.component.html',
  styleUrls: ['./login-message.component.css']
})
export class LoginMessageComponent {
  isModalVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Verifica o estado de login ao inicializar o componente
    this.isModalVisible = !this.authService.isLoggedIn(); // Exibe o modal se o usuário não estiver logado
  }

  showAlert() {
    this.isModalVisible = true; // Mostra o modal
    console.log('Método showAlert foi chamado');
  }

  closeAlert() {
    this.isModalVisible = false; // Fecha o modal
    console.log('Método closeAlert foi chamado');
    this.router.navigate(['']);
  }
}

