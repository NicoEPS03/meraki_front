import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-index-navbar",
  templateUrl: "./index-navbar.component.html",
})
export class IndexNavbarComponent implements OnInit {
  navbarOpen = false;
  admin = false;

  constructor() {}

  ngOnInit(): void {
    this.admin = (sessionStorage.getItem('isAuthenticated') == "true");
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
