import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { } //permite usar o HttpClient para fazer chamadas HTTP para a API.

  getProductsByType(type: string): Observable<any> { //usa o método get do HttpClient para fazer uma requisição HTTP GET para a URL composta pela base apiUrl concatenada com o tipo de produto selecionado
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsYXVkaWFAdmJ1cmdlci5jb20iLCJpYXQiOjE2OTI3Mjc3NzgsImV4cCI6MTY5MjczMTM3OCwic3ViIjoiMSJ9.Cm2siX7Une2RtWpPe47VjOU5blROZVAyquMdjEotex4'
      })
    };
    return this.http.get(`${this.apiUrl}`, httpOptions);
  }
}

