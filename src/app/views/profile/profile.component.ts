import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Club } from "src/app/model/Club";
import { ClubService } from "src/app/service/club.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  club : Club;
  id: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private clubService: ClubService) {}

  ngOnInit(): void {
    this.getClub(this.id = atob(this.route.snapshot.paramMap.get('id')));
  }

  getClub(id){
    this.clubService.getClub(id).subscribe(data => {
      this.club = data;
    });
  }

  goSocial(link){
    window.open(link, '_blank');
  }
}