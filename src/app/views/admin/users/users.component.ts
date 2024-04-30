import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from './../../../model/User';
import { UserService } from './../../../service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  dataSourceUsers = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'document', 'rol', 'state', 'accion'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  cantidad: number;
  pageIndex = 0;
  pageSize = 15;

  showModal = false;

  constructor(private userService: UserService, 
              private router: Router,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarPaginado();
    
  }

  listarPaginado(){
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

  toggleModal(id){
    console.log(id);
    this.showModal = !this.showModal;
  }

  eliminar(id){
    this.userService.deleteUser(id).subscribe(data => {
      this.userService.mensajeCambio.next('Usuario eliminado satisfactoreamente');
      this.router.navigate(['/admin/user']);
    });
}

}
