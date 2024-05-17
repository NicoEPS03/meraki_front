import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Family } from '../model/Family';
@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private url = `${environment.HOST}/family`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  getFamilyByAthlete(athlete){
    return this.http.get<any>(`${this.url}/getPageAthlete/${athlete}`);
  }

  getFamiliar(id){
    return this.http.get<any>(`${this.url}/get/${id}`);
  }

  insertFamiliar(familiar: Family){
    return this.http.post(`${this.url}/insert`, familiar);
  }

  editFamiliar(familiar: Family){
    return this.http.put(`${this.url}/edit`, familiar);
  }

  deleteFamiliar(id){
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }
}
