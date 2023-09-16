import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = "https://vintage-burger-api.vercel.app/login" //aqui define a url da api
  constructor(private http: HttpClient) { }       //esse constructor recebe uma injeção de dependência do serviço HttpClient do angular, que permite fazer http requests

  login(email: string, password: string): Observable<any> {  //primeiro método do serviço: login, faz uma solicitação de login para a API, passando os valores de email e password, para utilizar tem que chamar AuthService.login
    const data = { email, password }                         //cria um objeto com os parâmetros passados no método
    return this.http.post(`${this.apiUrl}`, data)      //usa o serviço HttpClient para fazer um request do tipo POST, com a url da API e os dados como body da request
  }

  saveToken(token: string): void {                //segundo método, serve para salva o valor do token de acesso no armazenamento local do navegador (com o localStorage)
    localStorage.setItem('token', token);
  }

  getToken(): string | null {                   //terceiro método, pega o token que foi armazenado no armazenamento local do navegador, se não estiver presente, retorna null
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {                      //quarto método, retorna um valor booleano para dizer se está logado ou não
    return !!this.getToken();
  }

  saveRole(role: string): void {
    localStorage.setItem('role', role)
  }
  getRole(): string | null {
    return localStorage.getItem('role')
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  
}


