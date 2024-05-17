import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Athlete } from 'src/app/model/Athlete';
import { DocumentType } from 'src/app/model/DocumentType';
import { Family } from 'src/app/model/Family';
import { FamilyService } from 'src/app/service/family.service';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-insert-family',
  templateUrl: './insert-family.component.html',
  styleUrls: ['./insert-family.component.css']
})
export class InsertFamilyComponent implements OnInit {

  form: FormGroup;
  id: number;
  idAthlete : number;
  edicion: boolean;
  documento = "Seleccione el documento de identidad";
  documentType: DocumentType;
  documentTypes: DocumentType[] = [];

  constructor(private familyService: FamilyService, private generalService: GeneralService,
    private router: Router, public dialogRef: MatDialogRef<InsertFamilyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.idAthlete = this.data.idAthlete
    this.edicion = this.data.edit;
    this.listarDocumentos();
    this.inicializarFormularioVacio();
    if (this.edicion == true) {      
      this.id = this.data.id;
      this.cargarDatos();
    }
  }

  listarDocumentos() {
    this.generalService.getDocuments().subscribe(data => {
      this.documentTypes = data;
    });
  }

  cargarDatos() {
    this.familyService.getFamiliar(this.id).subscribe(data => {
      this.id = data.id;
      this.form.get("name").setValue(data.name);
      this.form.get("document").setValue(data.document);
      this.documentType = data.documentType;
      this.documento = data.documentType.description;
      this.form.get("phone").setValue(data.phone);
      this.form.get("email").setValue(data.email);
      this.form.get("company").setValue(data.company);
      this.form.get("occupation").setValue(data.occupation);
      this.form.get("relationship").setValue(data.relationship);
    });
  }

  inicializarFormularioVacio() {
    if (this.edicion == true) {
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'name': new FormControl('', [Validators.required]),
        'document': new FormControl('', [Validators.required]),
        'documentType': new FormControl(DocumentType, [Validators.required]),
        'phone': new FormControl('', [Validators.required]),
        'email': new FormControl('', [Validators.required]),
        'company': new FormControl('', [Validators.required]),
        'occupation': new FormControl('', [Validators.required]),
        'relationship': new FormControl('', [Validators.required])
      });
    } else {
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'name': new FormControl('', [Validators.required]),
        'document': new FormControl('', [Validators.required]),
        'documentType': new FormControl(DocumentType, [Validators.required]),
        'phone': new FormControl('', [Validators.required]),
        'email': new FormControl('', [Validators.required]),
        'company': new FormControl('', [Validators.required]),
        'occupation': new FormControl('', [Validators.required]),
        'relationship': new FormControl('', [Validators.required])
      });
    }
  }

  guardar() {
    let family = new Family();
    family.athlete = new Athlete(this.idAthlete);
    family.name = this.form.value['name'];    
    family.documentType = new DocumentType(this.form.value['documentType']);
    family.document = this.form.value['document'];
    family.phone = this.form.value['phone'];
    family.email = this.form.value['email'];
    family.company = this.form.value['company'];
    family.occupation = this.form.value['occupation'];
    family.relationship = this.form.value['relationship'];
    if (this.edicion === true) {
      family.id = this.id;
      if (isNaN(Number(family.documentType.id))) {
        family.documentType = this.documentType;
      }

      this.familyService.editFamiliar(family).subscribe(() => {
        this.form.reset();
        this.dialogRef.close();
        this.familyService.mensajeCambio.next('Familiar editado satisfactoreamente');
      });
    } else {
      this.familyService.insertFamiliar(family).subscribe(() => {
        this.form.reset();
        this.dialogRef.close();
        this.familyService.mensajeCambio.next('Familiar agregado satisfactoreamente');
      });
    }
  }

  eliminar(){
    this.familyService.deleteFamiliar(this.id).subscribe(() => {
      this.form.reset();
      this.dialogRef.close();
      this.familyService.mensajeCambio.next('Familiar eliminado satisfactoreamente');
    });
  }

}
