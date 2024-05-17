import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from 'src/app/service/club.service';
import { DeleteClubComponent } from './delete-club/delete-club.component';
import { InsertCoachComponent } from './insert-coach/insert-coach.component';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  dataSourceClubs = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'sport', 'municipio', 'state', 'accion'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  cantidad: number;
  pageIndex = 0;
  pageSize = 15;

  showModal = false;

  constructor(private clubService: ClubService, public route: ActivatedRoute, 
    private dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarPaginado();
  }

  listarPaginado() {
    this.clubService.getPageClub(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSourceClubs = new MatTableDataSource(data.content);
      this.dataSourceClubs.sort = this.sort;
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

  deleteModal(id) {
    const dialogRef = this.dialog.open(DeleteClubComponent, { data: { id: id } });
    this.clubService.mensajeCambio.subscribe(data => {
      dialogRef.afterClosed().subscribe(result => {
        this.listarPaginado();
        this.openSnackBar(data);
      });
    });
  }

  insertModal(id,edit){
    const dialogRef = this.dialog.open(InsertCoachComponent, { data: { id: id, edit: edit} });
    this.clubService.mensajeCambio.subscribe(data => {
      dialogRef.afterClosed().subscribe(result => {
        this.listarPaginado();
        this.openSnackBar(data);
      });
    });
  }

}
