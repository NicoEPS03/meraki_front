import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Family } from '../model/Family';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private url = `${environment.HOST_BACK}/family`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  getFamilyByAthlete(athlete){
    return this.http.get<any>(`${this.url}/getPageAthlete/${athlete}`);
  }

  getFamiliar(id){
    return this.http.get<any>(`${this.url}/get/${id}`);
  }

  insertFamiliar(familiar: Family): Observable<any>{
    return this.http.post(`${this.url}/insert`, familiar).pipe(
      catchError(this.handleError)
    );
  }

  editFamiliar(familiar: Family): Observable<any>{
    return this.http.put(`${this.url}/edit`, familiar).pipe(
      catchError(this.handleError)
    );
  }

  deleteFamiliar(id){
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error?.message || 'Un error inesperado';
    return throwError(errorMessage);
  }
}
