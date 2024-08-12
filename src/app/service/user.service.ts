import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.HOST_BACK}/user`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  getPageUser(page, size){
    return this.http.get<any>(`${this.url}/getPage/${page}/${size}`);
  }

  getUser(id){
    return this.http.get<any>(`${this.url}/get/${id}`);
  }

  insertUser(user: User): Observable<any>{
    return this.http.post(`${this.url}/insert`, user).pipe(
      catchError(this.handleError)
    );
  }

  editUser(user: User): Observable<any>{
    return this.http.put(`${this.url}/edit`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id){
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error?.message || 'Un error inesperado';
    return throwError(errorMessage);
  }
}
