import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AthleteService } from 'src/app/service/athlete.service';
import { DeleteAthleteComponent } from './delete-athlete/delete-athlete.component';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.css']
})
export class AthleteComponent implements OnInit {
  dataSourceAthlete = new MatTableDataSource<any>();
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
              private snackBar: MatSnackBar) { }

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
    this.router.navigate([`/admin/club/${this.id}/athlete/insertar/`]);
  }

  editarAtleta(id){
    this.router.navigate([`/admin/club/${this.id}/athlete/edicion/${id}`]);
  }
}
