import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Club } from '../model/Club';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private url = `${environment.HOST_BACK}/club`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  getPageFilterSportAndCity(page, size, sport, city){
    return this.http.get<any>(`${this.url}/getPageFilterSportAndCity/${page}/${size}/${sport}/${city}`);
  }

  getAthletesByClub(club){
    return this.http.get<any>(`${this.url}/getAllExcel/${club}`);
  }
  
  getClub(id){
    return this.http.get<any>(`${this.url}/get/${id}`);
  }

  getNumClubs(sport, city){
    return this.http.get<any>(`${this.url}/getNumClubs/${sport}/${city}`);
  }

  getPageClub(page, size){
    return this.http.get<any>(`${this.url}/getPageAdmin/${page}/${size}`);
  }

  insertClub(club: Club): Observable<any>{
    return this.http.post(`${this.url}/insert`, club).pipe(
      catchError(this.handleError)
    );
  }

  editClub(club: Club): Observable<any>{
    return this.http.put(`${this.url}/edit`, club).pipe(
      catchError(this.handleError)
    );
  }

  deleteClub(id){
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error?.message || 'Un error inesperado';
    return throwError(errorMessage);
  }
}
