import { Component, OnInit } from "@angular/core";
import { GeneralService } from '../../service/general.service';
import { Sport } from "src/app/model/Sport";
import { City } from "src/app/model/City";
import { Club } from "src/app/model/Club";
import { ClubService } from "../../service/club.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  sports: Sport[] = [];
  cities: City[] = [];
  clubs: Club[] = [];
  selected = false;
  idSport = 0;
  city = null;
  pages = 0;
  pageIndex = 0;
  pageSize = 15;

  constructor(private generalService: GeneralService,
              private clubService: ClubService,
              private router: Router) { }

  ngOnInit(): void {
    this.generalService.getSports().subscribe(data => {
      this.sports = data;
    });
  }

  citiesSport(id) {
    this.selected = false;
    this.cities = [];
    this.idSport = id;
    this.generalService.getCitiesSports(id).subscribe(data => {
      this.cities = data;      
      this.clubs = [];
    });
  }

  clubCities(city) {
    this.clubs = [];
    this.selected = true;
    this.city = city;
    this.clubService.getPageFilterSportAndCity(this.pageIndex, this.pageSize, this.idSport, city).subscribe(data => {
      this.clubs = data.content;
    });
    this.clubService.getNumClubs(this.idSport, city).subscribe(data => {      
      this.pages =  Math.ceil(data/1);
    });
  }

  updateClubCities(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.clubCities(this.city);
  }

  goClub(id){
    this.router.navigate([`/club/${btoa(id)}`]);
  }
}
