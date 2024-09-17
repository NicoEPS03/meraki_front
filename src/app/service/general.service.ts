import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Sport } from '../model/Sport';
import { City } from '../model/City';
import { DocumentType } from '../model/DocumentType';
import { User } from '../model/User';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  idSport: number;
  idCity: number;
  
  private url = `${environment.HOST_BACK}/general`;

  constructor(private http: HttpClient) {}

  getSports(){
    return this.http.get<Sport[]>(`${this.url}/getSports`);
  }

  getCitiesSports(id){
    return this.http.get<City[]>(`${this.url}/getCitiesSport/${id}`);
  }

  getCities(){
    return this.http.get<City[]>(`${this.url}/getCities`);
  }

  getDocuments(){
    return this.http.get<DocumentType[]>(`${this.url}/getDocuments`);
  }

  login(user): Observable<any>{
    return this.http.post<User>(`${this.url}/login`, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error?.message || 'Un error inesperado';
    return throwError(errorMessage);
  }
}
