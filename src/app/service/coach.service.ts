import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coach } from '../model/Coach';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  private url = `${environment.HOST_BACK}/coach`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  getCoach(id){
    return this.http.get<any>(`${this.url}/get/${id}`);
  }

  getCoachByClub(id){
    return this.http.get<any>(`${this.url}/getCoachUser/${id}`);
  }

  getCoachByUser(id){
    return this.http.get<any>(`${this.url}/getCoachUser/${id}`);
  }

  insertCoach(coach: Coach): Observable<any>{
    return this.http.post(`${this.url}/insert`, coach).pipe(
      catchError(this.handleError)
    );
  }

  editCoach(coach: Coach): Observable<any>{
    return this.http.put(`${this.url}/edit`, coach).pipe(
      catchError(this.handleError)
    );
  }

  deleteCoach(id){
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error?.message || 'Un error inesperado';
    return throwError(errorMessage);
  }
}
