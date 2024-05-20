import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Acheteur } from '../Models/acheteur';
import { Observable, catchError, throwError } from 'rxjs';
import { Acte } from '../Models/acte';
import { Terrain } from '../Models/terrain';

@Injectable({
  providedIn: 'root'
})
export class NoteurService {
  
 private api = 'http://127.0.0.1:8000/api';
 httpHeaders = new HttpHeaders().set('Content-Type','application/json')
  constructor(private http: HttpClient) { }

  private handleError(error:HttpErrorResponse){
    console.error('Erreur:',error.error.message);
    return throwError('Ressayer');
  }

  getAcheteurs():Observable<Acheteur[]> {
    return this.http.get<Acheteur[]>(`${this.api}/acheteur`).pipe(
      catchError(this.handleError)
    );
}

// getAcheteurs(): Observable<Acheteur[]> {
//   return this.http.get<Acheteur[]>(this.apiUrl).pipe(
//     catchError(this.handleError)
//   );
// }

  getAdmin():Observable<any>{
    return this.http.get(`${this.api}/auth`);
  }

  getVendeurs():Observable<any>{
    return this.http.get(`${this.api}/vendeur`);
  }

  getTerrains():Observable<any>{
    return this.http.get(`${this.api}/terrain`);
  }

  getActes():Observable<any>{
    return this.http.get(`${this.api}/acte`)
  }

  addAcheteur(acheteur:Acheteur):Observable<any>{
   return this.http.post(`${this.api}/addacheteur`,acheteur)
  }

  addVendeur(vendeur:Acheteur):Observable<any>{
    return this.http.post(`${this.api}/addvendeur`,vendeur)
  }

  addTerrain(terrain:Terrain):Observable<any>{
    return this.http.post(`${this.api}/addterrain`,terrain);
  }

  addActe(acte:Acte):Observable<any>{
    return this.http.post(`${this.api}/addtransaction`,acte);
  }

  getAcheteurById(id:any):Observable<any>{
    let url = `${this.api}/acheteurbyId/${id}`;
    return this.http.get(url,{headers:this.httpHeaders});
  }

  getVendeurById(id:any):Observable<any>{
    let url = `${this.api}/vendeurbyId/${id}`;
    return this.http.get(url,{headers:this.httpHeaders});
  }

  getTerrainbyId(id:any):Observable<any>{
    let url = `${this.api}/terrainbyId/${id}`;
    return this.http.get(url,{headers:this.httpHeaders});
  }
  // updateAcheteur(id:any,acheteur:any):Observable<any>{
  //   let url = `${this.api}/updateacheteur/${id}`;
  //   return this.http.put(url,acheteur);
  // }

  updateAcheteur(acheteurData: any, acheteurId: any): Observable<any> {
    return this.http.put<any>(`http://127.0.0.1:8000/api/updateacheteur/${acheteurId}`, acheteurData);
  }

  updateVendeur(vendeurData: any, vendeurId: any): Observable<any> {
    return this.http.put<any>(`http://127.0.0.1:8000/api/updatevendeur/${vendeurId}`, vendeurData);
  }

  updateTerrain(terrainData:any, terrainId: any):Observable<any>{
    return this.http.put<any>(`http://127.0.0.1:8000/api/updateterrain/${terrainId}`,terrainData)
  }

  deleteAcheteur(id:number):Observable<any>{
    let url = `${this.api}/deleteacheteur/${id}`;
    return this.http.delete(url,{headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
    
  }

  deleteVendeur(id:number):Observable<any>{
    let url = `${this.api}/deletevendeur/${id}` ;
    return this.http.delete(url,{headers:this.httpHeaders});
  }

  deleteterrain(id:number):Observable<any>{
    let url = `${this.api}/deleteterrain/${id}` ;
    return this.http.delete(url,{headers:this.httpHeaders});
  }

  deleteActe(id:number):Observable<any>{
    let url = `${this.api}/deleteacte/${id}`;
    return this.http.delete(url,{headers:this.httpHeaders});
  }
}
