import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  init(): void {
    this.http.post<string>(`${environment.apiBaseUrl}/login/`, {
      login: 'letscode',
      senha: 'lets@123'
    }).subscribe(jwt => localStorage.setItem('user-auth', jwt))
  }

}
