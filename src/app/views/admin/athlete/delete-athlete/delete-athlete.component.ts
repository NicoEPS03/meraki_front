import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AthleteService } from 'src/app/service/athlete.service';

@Component({
  selector: 'app-delete-athlete',
  templateUrl: './delete-athlete.component.html',
  styleUrls: ['./delete-athlete.component.css']
})
export class DeleteAthleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteAthleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private athleteService: AthleteService,) { }

  ngOnInit(): void {
  }

  eliminar() {
    this.athleteService.deleteAthlete(this.data.id).subscribe(data => {
      this.dialogRef.close();
      this.athleteService.mensajeCambio.next('Deportista eliminado satisfactoreamente');
    });
  }

}
