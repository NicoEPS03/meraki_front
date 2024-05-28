import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { LandingComponent } from './landing.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from 'src/app/layouts/auth/auth.component';
import { LoginComponent } from '../auth/login/login.component';
import { IndexNavbarComponent } from 'src/app/components/navbars/index-navbar/index-navbar.component';
import { FooterComponent } from 'src/app/components/footers/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexNavbarComponent,
    LandingComponent,
    ProfileComponent,
    AuthComponent,
    LoginComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialModule,    
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class LandingModule { }
