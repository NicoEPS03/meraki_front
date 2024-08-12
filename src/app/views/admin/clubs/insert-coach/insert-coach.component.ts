import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Club } from 'src/app/model/Club';
import { Coach } from 'src/app/model/Coach';
import { DocumentType } from 'src/app/model/DocumentType';
import { CoachService } from 'src/app/service/coach.service';
import { GeneralService } from 'src/app/service/general.service';
import { User } from 'src/app/model/User';
import { ClubService } from 'src/app/service/club.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insert-coach',
  templateUrl: './insert-coach.component.html',
  styleUrls: ['./insert-coach.component.css']
})
export class InsertCoachComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;
  documento = "Seleccione el documento de identidad";
  documentType: DocumentType;
  documentTypes: DocumentType[] = [];
  hide = true;

  constructor(private coachService: CoachService, private generalService: GeneralService,
    private router: Router, public dialogRef: MatDialogRef<InsertCoachComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private clubService: ClubService, private infoSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.edicion = this.data.edit;
    this.listarDocumentos();
    this.inicializarFormularioVacio();
    if (this.edicion == true) {
      this.cargarDatos();
    }
  }

  inicializarFormularioVacio() {
    if (this.edicion == true) {
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'document': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required]),
        'name': new FormControl('', [Validators.required]),
        'lastName': new FormControl('', [Validators.required]),
        'documentType': new FormControl(DocumentType, [Validators.required])

      });
    } else {
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'document': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required]),
        'name': new FormControl('', [Validators.required]),
        'lastName': new FormControl('', [Validators.required]),
        'documentType': new FormControl(DocumentType, [Validators.required])
      });
    }
  }

  listarDocumentos() {
    this.generalService.getDocuments().subscribe(data => {
      this.documentTypes = data;
    });
  }

  cargarDatos() {
    this.coachService.getCoachByClub(this.data.id).subscribe(data => {
      this.form.get("document").setValue(data.user.document);
      this.form.get("password").setValue(data.user.password);
      this.form.get("name").setValue(data.name);
      this.form.get("lastName").setValue(data.lastName);
      this.documentType = data.documentType;
      this.documento = data.documentType.description;
      this.id = data.id;
    });
  }

  guardar() {
    let coach = new Coach();
    coach.name = this.form.value['name'];
    coach.lastName = this.form.value['lastName'];
    coach.user = new User(this.form.value['document'], this.form.value['password']);
    coach.documentType = new DocumentType(this.form.value['documentType']);
    coach.club = new Club(this.data.id);
    if (this.edicion === true) {
      coach.id = this.id;
      if (isNaN(Number(coach.documentType.id))) {
        coach.documentType = this.documentType;
      }

      this.coachService.editCoach(coach).subscribe(() => {
        this.form.reset();
        this.dialogRef.close();
        this.clubService.mensajeCambio.next('Coach editado satisfactoreamente');
      },
      error=> {
        this.infoSnackBar.open(error, '', {
          duration: 2000,
        });
      });
    } else {
      this.coachService.insertCoach(coach).subscribe(() => {
        this.form.reset();
        this.dialogRef.close();
        this.clubService.mensajeCambio.next('Coach agregado satisfactoreamente');
      },
      error=> {
        this.infoSnackBar.open(error, '', {
          duration: 2000,
        });
      });
    }
  }

  eliminar(){
    this.coachService.deleteCoach(this.id).subscribe(() => {
      this.form.reset();
      this.dialogRef.close();
      this.clubService.mensajeCambio.next('Coach eliminado satisfactoreamente');
    });
  }

}
