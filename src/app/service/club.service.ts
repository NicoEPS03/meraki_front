import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Club } from '../model/Club';
import { Subject } from 'rxjs';

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

  getClub(id){
    return this.http.get<any>(`${this.url}/get/${id}`);
  }

  getNumClubs(sport, city){
    return this.http.get<any>(`${this.url}/getNumClubs/${sport}/${city}`);
  }

  getPageClub(page, size){
    return this.http.get<any>(`${this.url}/getPageAdmin/${page}/${size}`);
  }

  insertClub(club: Club){
    return this.http.post(`${this.url}/insert`, club);
  }

  editClub(club: Club){
    return this.http.put(`${this.url}/edit`, club);
  }

  deleteClub(id){
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }
}
