import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { City } from 'src/app/model/City';
import { DocumentType } from 'src/app/model/DocumentType';
import { GeneralService } from 'src/app/service/general.service';
import { AthleteService } from 'src/app/service/athlete.service';
import { Athlete } from 'src/app/model/Athlete';
import { Club } from 'src/app/model/Club';
import { MatTableDataSource } from '@angular/material/table';
import { FamilyService } from 'src/app/service/family.service';
import { InsertFamilyComponent } from '../insert-family/insert-family.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFamilyComponent } from '../delete-family/delete-family.component';

@Component({
  selector: 'app-insert-athlete',
  templateUrl: './insert-athlete.component.html',
  styleUrls: ['./insert-athlete.component.css']
})
export class InsertAthleteComponent implements OnInit {
  dataSourceFamily = new MatTableDataSource();
  displayedColumnsFamily: string[] = ['id', 'name', 'document', 'phone', 'relationship', 'accion'];

  form: FormGroup;
  id: number;
  private idAthlete: number;
  private edicion: boolean;
  edad: number;
  nombrePoblacion = "Seleccione lugar de nacimiento";
  nombreCiudad = "Seleccione lugar de nacimiento";
  otroEstudios = "Otros estudios";
  city: City;
  cities: City[] = [];
  documento = "Seleccione el tipo de documento";
  documentType: DocumentType;
  documentTypes: DocumentType[] = [];
  selectedDate: string;
  maxDate: string;
  disabilityDisabled: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private snackBar: MatSnackBar, private generalService: GeneralService,
    private athleteService: AthleteService, private familyService: FamilyService,
    private dialog: MatDialog, private infoSnackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.idAthlete = params['idAthlete'];
      this.edicion = params['idAthlete'] != null;
    });
    this.inicializarFormularioVacio();
    this.listarCiudades();
    this.listarDocumentos();
    this.setMaxDate();
    if (this.edicion == true) {
      await this.cargarDatos();
      if (this.edad < 18) {
        this.cargarFamilia();
      }
    }
  }

  inicializarFormularioVacio() {
    if (this.edicion == true) {
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'name': new FormControl('', [Validators.required]),
        'lastName': new FormControl('', [Validators.required]),
        'eps': new FormControl('', [Validators.required]),
        'city': new FormControl(City, [Validators.required]),
        'bornDate': new FormControl('', [Validators.required]),
        'gender': new FormControl('', [Validators.required]),
        'phone': new FormControl(0, [Validators.required]),
        'direction': new FormControl('', [Validators.required]),
        'documentType': new FormControl(DocumentType, [Validators.required]),
        'document': new FormControl(0, [Validators.required]),
        'rh': new FormControl('', [Validators.required]),
        'neighborhood': new FormControl('', [Validators.required]),
        'email': new FormControl('', [Validators.required]),
        'schoolGrade': new FormControl(''),
        'grade': new FormControl(''),
        'institution': new FormControl(''),
        'profession': new FormControl(''),
        'otherStudy': new FormControl(''),
        'disability': new FormControl(false),
        'disabilityDescription': new FormControl(''),
        'disabilityType': new FormControl(''),
        'populationType': new FormControl(''),
        'otherPopulationType': new FormControl(''),
        'nationality': new FormControl('', [Validators.required]),
        'stratum': new FormControl('', [Validators.required]),
        'sisben': new FormControl('', [Validators.required]),
        'uniformSize': new FormControl('', [Validators.required]),
        'shoeSize': new FormControl('', [Validators.required]),
        'disease': new FormControl(false),
        'diseaseDescription': new FormControl(''),
      });
      this.form.get('schoolGrade')!.valueChanges.subscribe((value) => {
        switch (value) {
          case 'Primaria':
          case 'Bachillerato': {
            this.form.get('grade')!.enable();
            this.form.get('grade')!.setValidators(Validators.required);
            this.form.get('grade')!.updateValueAndValidity();
            this.form.get('otherStudy')!.disable();
            this.form.get('otherStudy')!.clearValidators();
            this.form.get('otherStudy')!.updateValueAndValidity();
            break;
          }
          case 'Técnico':
          case 'Tegnólogo':
          case 'Universitario': {
            this.form.get('grade')!.disable();
            this.form.get('grade')!.clearValidators();
            this.form.get('grade')!.updateValueAndValidity();
            this.form.get('otherStudy')!.enable();
            this.form.get('otherStudy')!.setValidators(Validators.required);
            this.otroEstudios = "¿Cuál?";
            this.form.get('otherStudy')!.updateValueAndValidity();
            break;
          }
          case 'Otro': {
            this.form.get('otherStudy')!.enable();
            this.form.get('otherStudy')!.setValidators(Validators.required);
            this.form.get('otherStudy')!.updateValueAndValidity();
          }
        }
      });

      this.form.get('disability')!.valueChanges.subscribe((value) => {
        if (value) {
          this.form.get('disabilityDescription')!.enable();
          this.form.get('disabilityDescription')!.setValidators(Validators.required);
          this.form.get('disabilityDescription')!.updateValueAndValidity();
          this.form.get('disabilityType')!.enable();
        } else {
          this.form.get('disabilityDescription')!.disable();
          this.form.get('disabilityDescription')!.clearValidators();
          this.form.get('disabilityDescription')!.updateValueAndValidity()
          this.form.get('disabilityType')!.disable();
        }
      });

      this.form.get('disease')!.valueChanges.subscribe((value) => {
        if (value) {
          this.form.get('diseaseDescription')!.enable();
          this.form.get('diseaseDescription')!.setValidators(Validators.required);
          this.form.get('diseaseDescription')!.updateValueAndValidity();
        } else {
          this.form.get('diseaseDescription')!.disable();
          this.form.get('diseaseDescription')!.clearValidators();
          this.form.get('diseaseDescription')!.updateValueAndValidity()
        }
      });

      this.form.get('populationType')!.valueChanges.subscribe((value) => {
        if (value == "Otros") {
          this.form.get('otherPopulationType')!.enable();
          this.form.get('otherPopulationType')!.setValidators(Validators.required);
          this.form.get('otherPopulationType')!.updateValueAndValidity();
        } else {
          this.form.get('otherPopulationType')!.disable();
          this.form.get('otherPopulationType')!.clearValidators();
          this.form.get('otherPopulationType')!.updateValueAndValidity()
        }
      });
    } else {
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'name': new FormControl('', [Validators.required]),
        'lastName': new FormControl('', [Validators.required]),
        'eps': new FormControl('', [Validators.required]),
        'city': new FormControl(City, [Validators.required]),
        'bornDate': new FormControl('', [Validators.required]),
        'gender': new FormControl('', [Validators.required]),
        'phone': new FormControl(0, [Validators.required]),
        'direction': new FormControl('', [Validators.required]),
        'documentType': new FormControl(DocumentType, [Validators.required]),
        'document': new FormControl(0, [Validators.required]),
        'rh': new FormControl('', [Validators.required]),
        'neighborhood': new FormControl('', [Validators.required]),
        'email': new FormControl('', [Validators.required]),
        'schoolGrade': new FormControl(''),
        'grade': new FormControl(''),
        'institution': new FormControl(''),
        'profession': new FormControl(''),
        'otherStudy': new FormControl(''),
        'disability': new FormControl(false),
        'disabilityDescription': new FormControl(''),
        'disabilityType': new FormControl(''),
        'populationType': new FormControl(''),
        'otherPopulationType': new FormControl(''),
        'nationality': new FormControl('', [Validators.required]),
        'stratum': new FormControl('', [Validators.required]),
        'sisben': new FormControl('', [Validators.required]),
        'uniformSize': new FormControl('', [Validators.required]),
        'shoeSize': new FormControl('', [Validators.required]),
        'disease': new FormControl(false),
        'diseaseDescription': new FormControl(''),
      });
      this.form.get('schoolGrade')!.valueChanges.subscribe((value) => {
        switch (value) {
          case 'Primaria':
          case 'Bachillerato': {
            this.form.get('grade')!.enable();
            this.form.get('grade')!.setValidators(Validators.required);
            this.form.get('grade')!.updateValueAndValidity();
            this.form.get('otherStudy')!.disable();
            this.form.get('otherStudy')!.clearValidators();
            this.form.get('otherStudy')!.updateValueAndValidity();
            break;
          }
          case 'Técnico':
          case 'Tegnólogo':
          case 'Universitario': {
            this.form.get('grade')!.disable();
            this.form.get('grade')!.clearValidators();
            this.form.get('grade')!.updateValueAndValidity();
            this.form.get('otherStudy')!.enable();
            this.form.get('otherStudy')!.setValidators(Validators.required);
            this.otroEstudios = "¿Cuál?";
            this.form.get('otherStudy')!.updateValueAndValidity();
            break;
          }
          case 'Otro': {
            this.form.get('otherStudy')!.enable();
            this.form.get('otherStudy')!.setValidators(Validators.required);
            this.form.get('otherStudy')!.updateValueAndValidity();
          }
        }
      });

      this.form.get('disability')!.valueChanges.subscribe((value) => {
        if (value) {
          this.form.get('disabilityDescription')!.enable();
          this.form.get('disabilityDescription')!.setValidators(Validators.required);
          this.form.get('disabilityDescription')!.updateValueAndValidity();
          this.form.get('disabilityType')!.enable();
        } else {
          this.form.get('disabilityDescription')!.disable();
          this.form.get('disabilityDescription')!.clearValidators();
          this.form.get('disabilityDescription')!.updateValueAndValidity()
          this.form.get('disabilityType')!.disable();
        }
      });

      this.form.get('disease')!.valueChanges.subscribe((value) => {
        if (value) {
          this.form.get('diseaseDescription')!.enable();
          this.form.get('diseaseDescription')!.setValidators(Validators.required);
          this.form.get('diseaseDescription')!.updateValueAndValidity();
        } else {
          this.form.get('diseaseDescription')!.disable();
          this.form.get('diseaseDescription')!.clearValidators();
          this.form.get('diseaseDescription')!.updateValueAndValidity()
        }
      });

      this.form.get('populationType')!.valueChanges.subscribe((value) => {
        if (value == "Otros") {
          this.form.get('otherPopulationType')!.enable();
          this.form.get('otherPopulationType')!.setValidators(Validators.required);
          this.form.get('otherPopulationType')!.updateValueAndValidity();
        } else {
          this.form.get('otherPopulationType')!.disable();
          this.form.get('otherPopulationType')!.clearValidators();
          this.form.get('otherPopulationType')!.updateValueAndValidity()
        }
      });
    }
  }

  listarCiudades() {
    this.generalService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  listarDocumentos() {
    this.generalService.getDocuments().subscribe(data => {
      this.documentTypes = data;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Información', {
      duration: 2000,
    });
  }

  setMaxDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: string | number = today.getMonth() + 1;
    let dd: string | number = today.getDate();

    if (mm < 10) {
      mm = '0' + mm;
    }
    if (dd < 10) {
      dd = '0' + dd;
    }
    this.maxDate = `${yyyy}-${mm}-${dd}`;
  }

  guardar() {
    let athlete = new Athlete();
    athlete.name = this.form.value['name'];
    athlete.lastName = this.form.value['lastName'];
    athlete.eps = this.form.value['eps'];
    athlete.bornCity = new City(this.form.value['city']);
    athlete.bornDate = this.form.value['bornDate'];
    athlete.gender = this.form.value['gender'];
    athlete.phone = this.form.value['phone'];
    athlete.direction = this.form.value['direction'];
    athlete.documentType = new DocumentType(this.form.value['documentType']);
    athlete.document = this.form.value['document'];
    athlete.rh = this.form.value['rh'];
    athlete.neighborhood = this.form.value['neighborhood'];
    athlete.email = this.form.value['email'];
    athlete.schoolGrade = this.form.value['schoolGrade'];
    athlete.grade = this.form.value['grade'];
    athlete.otherStudy = this.form.value['otherStudy'];
    athlete.institution = this.form.value['institution'];
    athlete.disability = this.form.value['disability'];
    athlete.disabilityType = this.form.value['disabilityType'];
    athlete.disabilityDescription = this.form.value['disabilityDescription'];
    athlete.uniformSize = this.form.value['uniformSize'];
    athlete.shoeSize = this.form.value['shoeSize'];
    athlete.populationType = this.form.value['populationType'];
    athlete.otherPopulationType = this.form.value['otherPopulationType'];
    athlete.nationality = this.form.value['nationality'];
    athlete.stratum = this.form.value['stratum'];
    athlete.sisben = this.form.value['sisben'];
    athlete.disease = this.form.value['disease'];
    athlete.disabilityDescription = this.form.value['disabilityDescription'];
    athlete.club = new Club(this.id);
    if(athlete.disability == false){
      delete athlete.disabilityType;
      delete athlete.disabilityDescription;
    }
    if(athlete.disabilityType == 'Ninguna'){
      delete athlete.disability;
      delete athlete.disabilityType;
      delete athlete.disabilityDescription;
    }
    if(athlete.disease == false){
      delete athlete.disabilityDescription;
    }
    if(athlete.populationType != 'Otros'){
      delete athlete.otherPopulationType;
    }
    if(athlete.populationType == 'Ninguna'){
      delete athlete.otherPopulationType;
      delete athlete.populationType;
    }
    if (this.edicion === true) {
      athlete.id = this.idAthlete;
      if (isNaN(Number(athlete.bornCity.id))) {
        athlete.bornCity = this.city;
      }

      if (isNaN(Number(athlete.documentType.id))) {
        athlete.documentType = this.documentType;
      }
      this.athleteService.editAthlete(athlete).subscribe(() => {
        this.form.reset();
        this.openSnackBar('Deportista editado satisfactoreamente');
        this.router.navigate([`/admin/club/${this.id}/athlete`]);
      },
      error=> {
        this.infoSnackBar.open(error, '', {
          duration: 2000,
        });
      });
    } else {
      this.athleteService.insertAthlete(athlete).subscribe(() => {
        this.form.reset();
        this.athleteService.mensajeCambio.next('Deportista guadado satisfactoreamente');
        this.router.navigate([`/admin/club/${this.id}/athlete`]);
      },
      error=> {
        this.infoSnackBar.open(error, '', {
          duration: 2000,
        });
      });
    }
  }

  async cargarDatos() {
    const data = await this.athleteService.getAthlete(this.idAthlete).toPromise();
    this.form.get("name").setValue(data.name);
    this.form.get("lastName").setValue(data.lastName);
    this.form.get("eps").setValue(data.eps);
    this.city = data.bornCity;
    this.nombreCiudad = data.bornCity.nombre;
    this.edad = this.calcularEdad(data.bornDate.toString());
    this.form.get("bornDate").setValue(data.bornDate);
    this.form.get("gender").setValue(data.gender);
    this.form.get("phone").setValue(data.phone);
    this.form.get("direction").setValue(data.direction);
    this.documentType = data.documentType;
    this.documento = data.documentType.description;
    this.form.get("document").setValue(data.document);
    this.form.get("rh").setValue(data.rh);
    this.form.get("neighborhood").setValue(data.neighborhood);
    this.form.get("email").setValue(data.email);
    this.form.get("schoolGrade").setValue(data.schoolGrade);
    this.form.get("grade").setValue(data.grade);
    this.form.get("institution").setValue(data.institution);
    this.form.get("profession").setValue(data.profession);
    this.form.get("otherStudy").setValue(data.otherStudy);
    this.form.get("disability").setValue(data.disability);
    this.form.get("disabilityDescription").setValue(data.disabilityDescription);
    this.form.get("disabilityType").setValue(data.disabilityType);
    this.form.get("populationType").setValue(data.populationType);
    this.form.get("otherPopulationType").setValue(data.otherPopulationType);
    this.form.get("nationality").setValue(data.nationality);
    this.form.get("stratum").setValue(data.stratum);
    this.form.get("sisben").setValue(data.sisben);
    this.form.get("uniformSize").setValue(data.uniformSize);
    this.form.get("shoeSize").setValue(data.shoeSize);
    this.form.get("disease").setValue(data.disease);
    this.form.get("diseaseDescription").setValue(data.diseaseDescription);
  }

  cargarFamilia() {
    this.familyService.getFamilyByAthlete(this.idAthlete).subscribe(data => {
      this.dataSourceFamily.data = data
    });
  }

  calcularEdad(fechaNacimientoStr: string): number {
    const fechaNacimiento = new Date(fechaNacimientoStr);
    const fechaActual = new Date();
    let age = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      age--;
    }

    return age;
  }

  insertModal(id, edit){
    const dialogRef = this.dialog.open(InsertFamilyComponent, { data: { id: id, edit: edit, idAthlete: this.idAthlete} });
    this.familyService.mensajeCambio.subscribe(data => {
      dialogRef.afterClosed().subscribe(result => {
        this.cargarFamilia();
        this.openSnackBar(data);
      });
    });
  }

  deleteModal(id) {
    const dialogRef = this.dialog.open(DeleteFamilyComponent, { data: { id: id } });
    this.familyService.mensajeCambio.subscribe(data => {
      dialogRef.afterClosed().subscribe(result => {
        this.cargarFamilia();
        this.openSnackBar(data);
      });
    });
  }
}
