import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { InsertUserComponent } from './insert-user/insert-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    UsersComponent,  
    DeleteUserComponent,
    InsertUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class UsersModule { }
