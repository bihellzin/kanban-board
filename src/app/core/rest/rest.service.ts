import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  get<T>(url: string) {
    return this.http.get<T>(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user-auth')}`
      }
    })
  }

  post<T>(url: string, body: unknown) {
    return this.http.post<T>(url, body,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user-auth')}`
      }
    })
  }

  put<T>(url: string, body: unknown) {
    return this.http.put<T>(url, body,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user-auth')}`
      }
    })
  }

  delete<T>(url: string) {
    return this.http.delete<T>(url,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user-auth')}`
      }
    })
  }
}
