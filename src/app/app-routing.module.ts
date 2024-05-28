import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";

// no layouts views
import { AuthGuard } from "./views/auth/auth.guard";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "user", loadChildren: () => import('./views/admin/users/users.module').then(m => m.UsersModule) },
      { path: 'club', loadChildren: () => import('./views/admin/clubs/clubs.module').then(m => m.ClubsModule) },
      { path: "", redirectTo: "user", pathMatch: "full" },
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
  { path: "", loadChildren: () => import('./views/landing/landing.module').then(m => m.LandingModule) },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
