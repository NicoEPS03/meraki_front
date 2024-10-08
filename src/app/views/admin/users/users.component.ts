import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../../service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataSourceUsers = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'document', 'rol', 'state', 'accion'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  cantidad: number;
  pageIndex = 0;
  pageSize = 15;

  showModal = false;

  constructor(private userService: UserService, public route: ActivatedRoute, 
    private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarPaginado();
  }

  listarPaginado() {
    this.userService.getPageUser(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSourceUsers = new MatTableDataSource(data.content);
      this.dataSourceUsers.sort = this.sort;
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
    const dialogRef = this.dialog.open(DeleteUserComponent, { data: { id: id } });
    this.userService.mensajeCambio.subscribe(data => {
      dialogRef.afterClosed().subscribe(result => {
        this.listarPaginado();
        this.openSnackBar(data);
      });
    });
  }

  exportExcel(){
    const dataToExport = this.dataSourceUsers.data.map(row => ({
      Id: row.id,
      Documento: row.document,
      Rol: row.rol.id,
      Estado: row.state
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'usuarios': worksheet },
      SheetNames: ['usuarios']
    };
    XLSX.writeFile(workbook, 'TablaUsuarios.xlsx');
  }
}
