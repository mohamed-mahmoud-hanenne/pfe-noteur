import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteurService {
  
 private api = 'http://127.0.0.1:8000/login';
 httpHeaders = new HttpHeaders().set('content-type','application/json')
  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.api}`)
  }
}
