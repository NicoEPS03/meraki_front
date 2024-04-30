import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.HOST}/user`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  getPageUser(page, size){
    return this.http.get<any>(`${this.url}/getPage/${page}/${size}`);
  }

  deleteUser(id){
    return this.http.get<any>(`${this.url}/delete/${id}`);
  }
}
