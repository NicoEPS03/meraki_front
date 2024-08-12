import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Athlete } from '../model/Athlete';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  private url = `${environment.HOST_BACK}/athlete`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  getAthletesByClub(page, size, club){
    return this.http.get<any>(`${this.url}/getPageClub/${page}/${size}/${club}`);
  }

  insertAthlete(athlete: Athlete): Observable<any>{
    return this.http.post(`${this.url}/insert`, athlete).pipe(
      catchError(this.handleError)
    );
  }

  editAthlete(athlete: Athlete): Observable<any>{
    return this.http.put(`${this.url}/edit`, athlete).pipe(
      catchError(this.handleError)
    );
  }

  deleteAthlete(id){
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }

  getAthlete(id){
    return this.http.get<Athlete>(`${this.url}/get/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error?.message || 'Un error inesperado';
    return throwError(errorMessage);
  }
}
