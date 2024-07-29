import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Athlete } from '../model/Athlete';

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

  insertAthlete(athlete: Athlete){
    return this.http.post(`${this.url}/insert`, athlete);
  }

  editAthlete(athlete: Athlete){
    return this.http.put(`${this.url}/edit`, athlete);
  }

  deleteAthlete(id){
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }

  getAthlete(id){
    return this.http.get<Athlete>(`${this.url}/get/${id}`);
  }
}
