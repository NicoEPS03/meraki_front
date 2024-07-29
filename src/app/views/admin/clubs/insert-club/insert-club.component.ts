import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { City } from 'src/app/model/City';
import { Club } from 'src/app/model/Club';
import { Sport } from 'src/app/model/Sport';
import { ClubService } from 'src/app/service/club.service';
import { GeneralService } from 'src/app/service/general.service';
import { InsertImageComponent } from '../insert-image/insert-image.component';

@Component({
  selector: 'app-insert-club',
  templateUrl: './insert-club.component.html',
  styleUrls: ['./insert-club.component.css']
})
export class InsertClubComponent implements OnInit {

  form: FormGroup;
  private id: number;
  edicion: boolean;
  nombreDeporte = "Seleccione el deporte";
  nombreCiudad = "Seleccione la ciudad";
  sport: Sport;
  city: City;
  sports: Sport[] = [];
  cities: City[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private clubService: ClubService, private snackBar: MatSnackBar,
              private generalService: GeneralService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
    });
    this.inicializarFormularioVacio();
    this.listarDeportes();
    this.listarCiudades();
    if (this.edicion == true) {
      this.cargarDatos();
    }
  }

  inicializarFormularioVacio() {
    if (this.edicion == true) {
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'name': new FormControl('', [Validators.required]),
        'sport': new FormControl(Sport,[Validators.required]),
        'city': new FormControl(City,[Validators.required]),
        'description': new FormControl(''),
        'instragramLink': new FormControl(''),
        'facebookLink': new FormControl(''),
        'twitterLink': new FormControl(''),
        'tiktokLink': new FormControl(''),
        'youtubeLink': new FormControl(''),
        'whatsappLink': new FormControl(''),
        
      });
    }else{
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'name': new FormControl('', [Validators.required]),
        'sport': new FormControl(Sport,[Validators.required]),
        'city': new FormControl(City,[Validators.required]),
        'description': new FormControl(''),
        'instragramLink': new FormControl(''),
        'facebookLink': new FormControl(''),
        'twitterLink': new FormControl(''),
        'tiktokLink': new FormControl(''),
        'youtubeLink': new FormControl(''),
        'whatsappLink': new FormControl(''),
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Información', {
      duration: 2000,
    });
  }
  
  listarDeportes(){
    this.generalService.getSports().subscribe(data => {
      this.sports = data;
    });
  }

  listarCiudades(){
    this.generalService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  guardar(){
    let club = new Club();
    club.name = this.form.value['name'];
    club.description = this.form.value['description'];
    club.instragramLink = this.form.value['instragramLink'];
    club.facebookLink = this.form.value['facebookLink'];
    club.twitterLink = this.form.value['twitterLink'];
    club.tiktokLink = this.form.value['tiktokLink'];
    club.youtubeLink = this.form.value['youtubeLink'];
    club.whatsappLink = this.form.value['whatsappLink'];
    club.city = new City(this.form.value['city']);
    club.sport = new Sport(this.form.value['sport']);
    if(this.edicion === true) {
      club.id = this.id;
      if (isNaN(Number(club.city.id)) ){
        club.city = this.city;
      }

      if (isNaN(Number(club.sport.id))){
        club.sport = this.sport;
      }
      this.clubService.editClub(club).subscribe(() => {
        this.form.reset();
        this.openSnackBar('Club editado satisfactoreamente');
        this.router.navigate(['/admin/clubs']);
      });
    }else{
      this.clubService.insertClub(club).subscribe(() => {
        this.form.reset();
        this.clubService.mensajeCambio.next('Club guadado satisfactoreamente');
        this.router.navigate(['/admin/clubs']);
      });
    }
  }

  cargarDatos() {
    this.clubService.getClub(this.id).subscribe(data =>{
        this.form.get("name").setValue(data.name);
        this.form.get("description").setValue(data.description);
        this.sport = data.sport;
        this.city = data.city;
        this.nombreDeporte = data.sport.name;
        this.nombreCiudad = data.city.nombre;
        this.form.get("instragramLink").setValue(data.instragramLink);
        this.form.get("facebookLink").setValue(data.facebookLink);
        this.form.get("twitterLink").setValue(data.twitterLink);
        this.form.get("tiktokLink").setValue(data.tiktokLink);
        this.form.get("youtubeLink").setValue(data.youtubeLink);
        this.form.get("whatsappLink").setValue(data.whatsappLink);
    });
  }

  verDeportistas(){
    this.router.navigate([`/admin/clubs/${this.id}/athlete`]);
  }

  insertImageModal(){
    const dialogRef = this.dialog.open(InsertImageComponent, { data: { idClub: this.id, edicion: false} });
    this.clubService.mensajeCambio.subscribe(data => {
      dialogRef.afterClosed().subscribe(result => {
        this.openSnackBar(data);
      });
    });
  }
}
