import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: "club/:id", component: ProfileComponent },
  { path: "", component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
