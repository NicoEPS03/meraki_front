import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertUserComponent } from './insert-user/insert-user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: "", component: UsersComponent},
  { path: "insertar", component: InsertUserComponent},
  { path: 'edicion/:id', component: InsertUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
