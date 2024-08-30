import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClubImages } from '../model/ClubImages';
import * as AWS from 'aws-sdk';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubImagesService {

  private url = `${environment.HOST_BACK}/clubImages`;  
  private urImg = new AWS.Endpoint(`${environment.HOST_IMG}`);

  constructor(private http: HttpClient) {
    AWS.config.update({
      accessKeyId: 'DO00XNKX846J3ZEYDNDQ',
      secretAccessKey: 'yrPJcpvL9XN7ilc9f9/5pOWnhi9SnQxcbD/ER0kq27Y'
    });
  }
  
  getImages(id){
    return this.http.get<any>(`${this.url}/get/${id}`);
  }

  insertImageClub(image: ClubImages, file: File){
    this.uploadFile(file, image.url);
    image.url = 'https://meraki.' + this.urImg.hostname + '/clubs_images/' + image.url;
    return this.http.post(`${this.url}/insert`, image).pipe(
      catchError(this.handleError)
    );;
  }

  deleteImageClub(url,id){
    let parts: string[] = url.split('/');
    let fileName: string = parts[parts.length - 1];
    this.deleteFile(fileName);
    return this.http.delete<any>(`${this.url}/delete/${id}`).pipe(
      catchError(this.handleError)
    );;
  }

  uploadFile(file: File, fileName: string): Promise<any> {
    const params = {
      Bucket: 'meraki',
      Key: fileName,
      Body: file,
      ACL: 'public-read'
    };

    const s3 = new AWS.S3({
      endpoint: this.urImg,
      region: 'nyc3'
    });

    return s3.upload(params).promise();
  }

  deleteFile(fileName: string): Promise<any> {
    const params = {
      Bucket: 'meraki',
      Key: fileName
    };

    const s3 = new AWS.S3({
      endpoint: this.urImg,
      region: 'nyc3'
    });

    return s3.deleteObject(params).promise();
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error?.message || 'Un error inesperado';
    return throwError(errorMessage);
  }

}
