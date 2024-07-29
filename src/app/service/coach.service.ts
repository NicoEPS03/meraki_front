import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coach } from '../model/Coach';

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

  insertCoach(coach: Coach){
    return this.http.post(`${this.url}/insert`, coach);
  }

  editCoach(coach: Coach){
    return this.http.put(`${this.url}/edit`, coach);
  }

  deleteCoach(id){
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }
}
