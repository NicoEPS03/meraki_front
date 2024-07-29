import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Club } from 'src/app/model/Club';
import { ClubImages } from 'src/app/model/ClubImages';
import { ClubImagesService } from 'src/app/service/club-images.service';

@Component({
  selector: 'app-insert-image',
  templateUrl: './insert-image.component.html',
  styleUrls: ['./insert-image.component.css']
})
export class InsertImageComponent implements OnInit {

  form: FormGroup;
  private idClub: number;
  edicion: boolean;
  selectedFile?: File;
  imgURL: string | ArrayBuffer | null = null;
  fileName: string = '';
  progress = 0;

  constructor(private imageClubService: ClubImagesService, public dialogRef: MatDialogRef<InsertImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.idClub = this.data.idClub;
    this.edicion = this.data.edicion;

    this.inicializarFormularioVacio();
  }

  inicializarFormularioVacio() {
    if (this.edicion == true) {
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'url': new FormControl(''),
        'banner': new FormControl(false),
        'logo': new FormControl(false),
        'other': new FormControl(false),
      });
    } else {
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'url': new FormControl(''),
        'banner': new FormControl(false),
        'logo': new FormControl(false),
        'other': new FormControl(false),
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;

      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    }
  }

  saveFile(): void {
    this.progress = 0;
    let clubImage = new ClubImages;
    clubImage.club = new Club(this.idClub);
    clubImage.url = `${new Date().toDateString()}_${this.idClub}_${this.fileName}`;
    clubImage.banner = this.form.value['banner'];
    clubImage.logo = this.form.value['logo'];
    clubImage.other = this.form.value['other'];

    if (this.edicion === true) {
      //clubImage.id = this.id;
    } else {
      if (this.selectedFile) {
        this.imageClubService.insertImageClub(clubImage, this.selectedFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              //this.message = 'Archivo subido con éxito';
            }
          },
          (err: any) => {
            this.progress = 0;
            //this.message = 'No se pudo subir el archivo!';
            this.selectedFile = undefined;
          });

        this.selectedFile = undefined;
      }
    }
  }
}
