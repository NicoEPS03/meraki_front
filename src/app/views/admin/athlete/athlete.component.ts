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
    const dataToExport = this.dataSourceAthleteExcel.data.map(row => ({
      Nombre: row.name,
      Apellido: row.lastName,
      EPS: row.eps,
      "Fecha Nacimiento": row.bornDate,
      "Lugar Nacimiento": row.bornCity.nombre,
      Genero: row.gender,
      Telefono: row.phone,
      Direccion: row.direction,
      Documento: row.document,
      "Tipo Documento": row.documentType.description,
      RH: row.rh,
      Barrio: row.neighborhood,
      Correo: row.email,
      "Grado Escuela": row.schoolGrade,
      Grado: row.grade,
      Institucion: row.institution,
      Profesion: row.profession,
      "Otros Estudios": row.otherStudy,
      Discapacidad: row.disability,
      "Descripcion Discapacidad": row.disabilityDescription,
      "Tipo Discapacidad": row.disabilityType,
      "Tipo Poblacion": row.populationType,
      "Otro Tipo Poblacion": row.otherPopulationType,
      Nacionalidad: row.nationality,
      Estrato: row.stratum,
      SISBEN: row.sisben == 0 ? 'N/A' : row.sisben,
      Enfermedad: row.disease,
      "Descripcion Enfermedad": row.diseaseDescription
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'clubes': worksheet },
      SheetNames: ['clubes']
    };
    XLSX.writeFile(workbook, 'TablaAtletas.xlsx');
  }
}