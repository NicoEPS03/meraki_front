import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClubImages } from '../model/ClubImages';

@Injectable({
  providedIn: 'root'
})
export class ClubImagesService {

  private url = `${environment.HOST_BACK}/clubImages`;
  private urImg = `${environment.HOST_IMG}/club`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  insertImageClub(image: ClubImages, file: File){
    return this.http.post(`${this.url}/insert`, image);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.urImg}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  
  getImages(id){
    return this.http.get<any>(`${this.url}/get/${id}`);
  }

}
