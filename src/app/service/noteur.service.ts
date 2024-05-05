import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Acheteur } from '../Models/acheteur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteurService {
  
 private api = 'http://127.0.0.1:8000/api';
//  httpHeaders = new HttpHeaders().set('content-type','application/json')
  constructor(private http: HttpClient) { }

  getAcheteurs():Observable<any> {
    return this.http.get(`${this.api}/acheteur`);
}

  getAdmin():Observable<any>{
    return this.http.get(`${this.api}/auth`);
  }

  getVendeurs():Observable<any>{
    return this.http.get(`${this.api}/vendeur`);
  }
}
