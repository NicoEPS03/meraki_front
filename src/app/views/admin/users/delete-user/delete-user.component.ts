import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              private userService: UserService,) { }

  ngOnInit(): void {
  } 

  eliminar() {  
    this.userService.deleteUser(this.data.id).subscribe(data => {
      this.dialogRef.close();
      this.userService.mensajeCambio.next('Usuario eliminado satisfactoreamente');
    });
  }
}
