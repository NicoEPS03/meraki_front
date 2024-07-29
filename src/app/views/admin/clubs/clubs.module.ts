import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubsRoutingModule } from './clubs-routing.module';
import { DeleteClubComponent } from './delete-club/delete-club.component';
import { InsertClubComponent } from './insert-club/insert-club.component';
import { InsertCoachComponent } from './insert-coach/insert-coach.component';
import { AthleteComponent } from '../athlete/athlete.component';
import { DeleteAthleteComponent } from '../athlete/delete-athlete/delete-athlete.component';
import { InsertAthleteComponent } from '../athlete/insert-athlete/insert-athlete.component';
import { InsertFamilyComponent } from '../athlete/insert-family/insert-family.component';
import { DeleteFamilyComponent } from '../athlete/delete-family/delete-family.component';
import { InsertImageComponent } from './insert-image/insert-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ClubsComponent } from './clubs.component';


@NgModule({
  declarations: [
    ClubsComponent,
    DeleteClubComponent,
    InsertClubComponent,
    InsertCoachComponent,
    AthleteComponent,
    DeleteAthleteComponent,
    InsertAthleteComponent,
    InsertFamilyComponent,
    DeleteFamilyComponent,
    InsertImageComponent,
  ],
  imports: [
    CommonModule,
    ClubsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class ClubsModule { }
