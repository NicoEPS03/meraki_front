import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              private userService: UserService,) { }

  ngOnInit(): void {
  } 

  eliminar() {
    this.dialogRef.close();
    this.userService.mensajeCambio.next('Usuario eliminado satisfactoreamente');    
    this.userService.deleteUser(this.data.id).subscribe();
  }
}
