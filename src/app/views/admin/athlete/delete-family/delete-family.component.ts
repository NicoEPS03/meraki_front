import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FamilyService } from 'src/app/service/family.service';

@Component({
  selector: 'app-delete-family',
  templateUrl: './delete-family.component.html',
  styleUrls: ['./delete-family.component.css']
})
export class DeleteFamilyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteFamilyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private familyService: FamilyService,) { }

  ngOnInit(): void {
  }

  eliminar() {
    this.familyService.deleteFamiliar(this.data.id).subscribe(data => {
      this.dialogRef.close();
      this.familyService.mensajeCambio.next('Familiar eliminado satisfactoreamente');
    });
  }

}
