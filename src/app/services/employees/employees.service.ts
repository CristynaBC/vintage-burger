import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient, private authService: AuthService) { } 
  getUsers(): Observable<any[]> {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}` 
      })
    };
    return this.http.get<any[]>(`${this.apiUrl}`, httpOptions);
  }
}
