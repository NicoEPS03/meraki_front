import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';

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

  insertUser(user: User){
    return this.http.post(`${this.url}/insert`, user);
  }

  editUser(user: User){
    return this.http.put(`${this.url}/edit`, user);
  }

  deleteUser(id){
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }
}
