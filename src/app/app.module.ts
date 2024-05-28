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
import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AdminComponent,
    AdminNavbarComponent,
    FooterAdminComponent,
    UserDropdownComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
