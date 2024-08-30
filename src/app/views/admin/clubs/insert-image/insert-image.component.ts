import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
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
  selectedFile?: File;
  imgURL: string | ArrayBuffer | null = null;
  fileName: string = '';

  dataSourceImages = new MatTableDataSource<any>();
  displayedColumns: string[] = ['tipoImagen', 'eliminar'];

  constructor(private imageClubService: ClubImagesService, public dialogRef: MatDialogRef<InsertImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private infoSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.idClub = this.data.idClub;

    this.listar();
    this.inicializarFormularioVacio();
  }

  listar() {
    this.imageClubService.getImages(this.idClub).subscribe(data => {
      this.dataSourceImages = new MatTableDataSource(data);
    });
  }

  inicializarFormularioVacio() {
    this.form = new FormGroup({
      'id': new FormControl(0, [Validators.required]),
      'url': new FormControl(''),
      'banner': new FormControl(false),
      'logo': new FormControl(false),
      'other': new FormControl(false),
    });
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
  
  formatDateString(inputDate: string): string {
    const date = new Date(inputDate);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}_${month}_${year}`;
  }

  saveFile(): void {
    let clubImage = new ClubImages;
    clubImage.club = new Club(this.idClub);
    clubImage.url = `${this.formatDateString(new Date().toDateString())}_${this.idClub}_${this.fileName}`;
    clubImage.banner = this.form.value['banner'];
    clubImage.logo = this.form.value['logo'];
    clubImage.other = this.form.value['other'];

    if (this.selectedFile) {
      this.imageClubService.insertImageClub(clubImage, this.selectedFile).subscribe(() => {
          this.infoSnackBar.open('Imagen guardada satisfactoreamente', 'Informacion', {
            duration: 2000,
          });
          this.listar();
          this.selectedFile = undefined;
          this.imgURL = null;
          this.form.reset();
        },
        error=> {
          this.infoSnackBar.open(error, '', {
            duration: 2000,
          });
        });
    }
  }

  delete(url, id): void{
    this.imageClubService.deleteImageClub(url, id).subscribe(() => {
      this.infoSnackBar.open('Imagen eliminada satisfactoreamente', 'Informacion', {
        duration: 2000,
      });
      this.listar();
      this.form.reset();
    },
    error=> {
      this.infoSnackBar.open(error, '', {
        duration: 2000,
      });
    });
  }
}
