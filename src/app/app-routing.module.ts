import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";

// no layouts views
import { AuthGuard } from "./views/auth/auth.guard";
import { ProfileComponent } from "./views/landing/profile/profile.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ClubComponent } from "./views/admin/club/club.component";
import { SupporNetComponent } from "./views/landing/suppor-net/suppor-net.component";
import { GodFatherComponent } from "./views/landing/god-father/god-father.component";
import { AboutUsComponent } from "./views/landing/about-us/about-us.component";
import { GrowLifeComponent } from "./views/landing/grow-life/grow-life.component";
import { IndexComponent } from "./views/index/index.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "users", loadChildren: () => import('./views/admin/users/users.module').then(m => m.UsersModule) },
      { path: "clubs", loadChildren: () => import('./views/admin/clubs/clubs.module').then(m => m.ClubsModule) },
      { path: "club", component: ClubComponent},
    ],
    canActivate: [AuthGuard]
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views 
  { path: "club/:id", component: ProfileComponent },
  { path: "suppornet", component: SupporNetComponent},
  { path: "godfather", component: GodFatherComponent},
  { path: "aboutus", component: AboutUsComponent},
  { path: "growlife", component: GrowLifeComponent},  
  { path: "directory", component: LandingComponent },
  { path: "", component: IndexComponent},
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {  
}
