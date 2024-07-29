import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertClubComponent } from './insert-club/insert-club.component';
import { AthleteComponent } from '../athlete/athlete.component';
import { InsertAthleteComponent } from '../athlete/insert-athlete/insert-athlete.component';
import { ClubsComponent } from './clubs.component';

const routes: Routes = [
  { path: "", component: ClubsComponent},
  { path: "insertar", component: InsertClubComponent},
  { path: 'edicion/:id', component: InsertClubComponent},
  { path: ':id/athlete', component: AthleteComponent},
  { path: ':id/athlete/insertar', component: InsertAthleteComponent},  
  { path: ':id/athlete/edicion/:idAthlete', component: InsertAthleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubsRoutingModule { }
