import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.id = atob(this.route.snapshot.paramMap.get('id'));
  }
}
