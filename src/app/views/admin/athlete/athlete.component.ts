import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AthleteService } from 'src/app/service/athlete.service';
import { DeleteAthleteComponent } from './delete-athlete/delete-athlete.component';
import * as XLSX from 'xlsx';
import { ClubService } from 'src/app/service/club.service';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.css']
})
export class AthleteComponent implements OnInit {
  dataSourceAthlete = new MatTableDataSource<any>();
  dataSourceAthleteExcel = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'lastName', 'document', 'accion'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  id: number;

  cantidad: number;
  pageIndex = 0;
  pageSize = 15;

  showModal = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private athleteService: AthleteService, private dialog: MatDialog,
              private snackBar: MatSnackBar, private clubService: ClubService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.listarPaginado();
  }

  listarPaginado() {
    this.athleteService.getAthletesByClub(this.pageIndex, this.pageSize, this.id).subscribe(data => {
      this.dataSourceAthlete = new MatTableDataSource(data.content);
      this.dataSourceAthlete.sort = this.sort;
      this.cantidad = data.totalElements;
    });
    this.clubService.getAthletesByClub(this.id).subscribe(data => {
      this.dataSourceAthleteExcel = new MatTableDataSource(data);
    });   
  }

  cambiarPagina(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Información', {
      duration: 2000,
    });
  }

  toggleModal(id) {
    const dialogRef = this.dialog.open(DeleteAthleteComponent, { data: { id: id } });
    this.athleteService.mensajeCambio.subscribe(data => {
      dialogRef.afterClosed().subscribe(result => {
        this.listarPaginado();
        this.openSnackBar(data);
      });
    });
  }

  guardarAtleta(){
    this.router.navigate([`/admin/clubs/${this.id}/athlete/insertar/`]);
  }

  editarAtleta(id){
    this.router.navigate([`/admin/clubs/${this.id}/athlete/edicion/${id}`]);
  }

  exportExcel(){
    const dataToExport = this.dataSourceAthleteExcel.data.map(row => {
      const acudientes = row.familyDtoList.reduce((acc, familiar, index) => {
        acc[`Relacion acudiente ${index + 1}`] = familiar.relationship;
        acc[`Nombre acudiente ${index + 1}`] = familiar.name;
        acc[`Documento acudiente ${index + 1}`] = familiar.document;
        acc[`Tipo Documento acudiente ${index + 1}`] = familiar.documentType.description;
        acc[`Telefono acudiente ${index + 1}`] = familiar.phone;
        acc[`Correo acudiente ${index + 1}`] = familiar.email;
        acc[`Empresa acudiente ${index + 1}`] = familiar.company;
        acc[`Ocupacion acudiente ${index + 1}`] = familiar.occupation;
        return acc;
      }, {});
    
      // Devuelve el objeto con los datos del atleta y los familiares
      return {
        Nombre: row.athlete.name,
        Apellido: row.athlete.lastName,
        EPS: row.athlete.eps,
        "Fecha Nacimiento": row.athlete.bornDate,
        "Lugar Nacimiento": row.athlete.bornCity.nombre,
        Genero: row.athlete.gender,
        Telefono: row.athlete.phone,
        Direccion: row.athlete.direction,
        Documento: row.athlete.document,
        "Tipo Documento": row.athlete.documentType.description,
        RH: row.athlete.rh,
        Barrio: row.athlete.neighborhood,
        Correo: row.athlete.email,
        "Grado Escuela": row.athlete.schoolGrade,
        Grado: row.athlete.grade,
        Institucion: row.athlete.institution,
        Profesion: row.athlete.profession,
        "Otros Estudios": row.athlete.otherStudy,
        Discapacidad: row.athlete.disability,
        "Descripcion Discapacidad": row.athlete.disabilityDescription,
        "Tipo Discapacidad": row.athlete.disabilityType,
        "Tipo Poblacion": row.athlete.populationType,
        "Otro Tipo Poblacion": row.athlete.otherPopulationType,
        Nacionalidad: row.athlete.nationality,
        Estrato: row.athlete.stratum,
        SISBEN: row.athlete.sisben == 0 ? 'N/A' : row.athlete.sisben,
        Enfermedad: row.athlete.disease,
        "Descripcion Enfermedad": row.athlete.diseaseDescription,
        ...acudientes
      };
    });
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'atletas': worksheet },
      SheetNames: ['atletas']
    };
    XLSX.writeFile(workbook, 'TablaAtletas.xlsx');
  }
}