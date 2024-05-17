import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { UsersComponent } from "./views/admin/users/users.component";
import { InsertUserComponent } from "./views/admin/users/insert-user/insert-user.component";
import { ClubsComponent } from "./views/admin/clubs/clubs.component";
import { InsertClubComponent } from "./views/admin/clubs/insert-club/insert-club.component";
import { AthleteComponent } from "./views/admin/athlete/athlete.component";
import { InsertAthleteComponent } from "./views/admin/athlete/insert-athlete/insert-athlete.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "user", component: UsersComponent},
      { path: "user/insertar", component: InsertUserComponent},
      { path: 'user/edicion/:id', component: InsertUserComponent},
      { path: 'club', component: ClubsComponent},
      { path: "club/insertar", component: InsertClubComponent},
      { path: 'club/edicion/:id', component: InsertClubComponent},
      { path: 'club/:id/athlete', component: AthleteComponent},
      { path: 'club/:id/athlete/insertar', component: InsertAthleteComponent},
      { path: 'club/:id/athlete/edicion/:idAthlete', component: InsertAthleteComponent},
      
      { path: "", redirectTo: "user", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "club/:id", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: LandingComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
