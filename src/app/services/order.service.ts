import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient, private authService: AuthService) { } //permite usar o HttpClient para fazer chamadas HTTP para a API.

  getProductsByType(type: string): Observable<any> { //usa o método get do HttpClient para fazer uma requisição HTTP GET para a URL composta pela base apiUrl concatenada com o tipo de produto selecionado
    const token = this.authService.getToken(); // Obtenha o token do AuthService

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}` // Usa o token obtido do AuthService
      })
    };
    return this.http.get(`${this.apiUrl}`, httpOptions);
  }
}

