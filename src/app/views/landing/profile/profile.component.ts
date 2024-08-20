import { ViewportScroller } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Club } from "src/app/model/Club";
import { ClubImages } from "src/app/model/ClubImages";
import { ClubImagesService } from "src/app/service/club-images.service";
import { ClubService } from "src/app/service/club.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  club : Club;
  images : ClubImages
  id: string;
  constructor(private route: ActivatedRoute, private router: Router,
              private clubService: ClubService, private imagesService: ClubImagesService,
              private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.getClub(this.id = atob(this.route.snapshot.paramMap.get('id')));
  }

  getClub(id){
    this.clubService.getClub(id).subscribe(data => {
      this.club = data;
      this.imagesService.getImages(data.id).subscribe(data =>{
        this.images = data
        console.log(data)
      })
    });
  }

  goSocial(link){
    window.open(link, '_blank');
  }
}