import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClubService } from 'src/app/service/club.service';

@Component({
  selector: 'app-delete-club',
  templateUrl: './delete-club.component.html',
  styleUrls: ['./delete-club.component.css']
})
export class DeleteClubComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteClubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clubService: ClubService,) { }

  ngOnInit(): void {
  }

  eliminar() {
    this.clubService.deleteClub(this.data.id).subscribe(data => {
      this.dialogRef.close();
      this.clubService.mensajeCambio.next('Club eliminado satisfactoreamente');
    });
  }
}
