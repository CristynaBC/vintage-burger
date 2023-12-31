import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private apiUrl = 'https://vintage-burger-api.vercel.app/users';

  constructor(private http: HttpClient, private authService: AuthService) {}
  getUsers(): Observable<any[]> {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<any[]>(`${this.apiUrl}`, httpOptions);
  }

  editUser(user: any): Observable<any> {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.patch<any>(`${this.apiUrl}/${user.id}`, user, httpOptions);
  }

  deleteUser(user: any): Observable<any> {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete<any>(`${this.apiUrl}/${user.id}`, httpOptions);
  }

  createUser(newUser: any): Observable<any> {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<any>(`${this.apiUrl}`, newUser, httpOptions);
  }
}
