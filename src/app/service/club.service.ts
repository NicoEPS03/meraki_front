import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Club } from '../model/Club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private url = `${environment.HOST}/club`;

  constructor(private http: HttpClient) { }

  getPageFilterSportAndCity(page, size, sport, city){
    return this.http.get<any>(`${this.url}/getPageFilterSportAndCity/${page}/${size}/${sport}/${city}`);
  }

  getClub(id){
    return this.http.get<any>(`${this.url}/get/${id}`);
  }
}
