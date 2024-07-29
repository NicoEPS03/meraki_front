import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";

// components for views and layouts
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AuthComponent } from "./layouts/auth/auth.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/landing/profile/profile.component";
import { LoginComponent } from "./views/auth/login/login.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClubComponent } from './views/admin/club/club.component';
import { SupporNetComponent } from './views/landing/suppor-net/suppor-net.component';
import { GodFatherComponent } from './views/landing/god-father/god-father.component';
import { AboutUsComponent } from './views/landing/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AdminComponent,
    IndexNavbarComponent,
    LandingComponent,
    ProfileComponent,
    AuthComponent,
    LoginComponent,
    FooterComponent,
    ClubComponent,
    SupporNetComponent,
    GodFatherComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
