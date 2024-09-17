import { Component, OnInit, ViewChild } from "@angular/core";
import { GeneralService } from '../../service/general.service';
import { Sport } from "src/app/model/Sport";
import { City } from "src/app/model/City";
import { Club } from "src/app/model/Club";
import { ClubService } from "../../service/club.service";
import { Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { MatSelect } from "@angular/material/select";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @ViewChild("selectSport") selectSport : MatSelect
  sports: Sport[] = [];
  cities: City[] = [];
  clubs: Club[] = [];
  selected = false;
  idSport = 0;
  city = null;
  pages = 0;
  pageIndex = 0;
  pageSize = 15;

  constructor(private generalService: GeneralService, private clubService: ClubService,
              private router: Router, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    //this.viewportScroller.scrollToPosition([0, 0]);
    if(this.generalService.idSport){
      this.reloadBack();
    }

    this.generalService.getSports().subscribe(data => {
      this.sports = data;
    });
  }

  reloadBack(){
    this.generalService.getCitiesSports(this.generalService.idSport).subscribe(data => {
      this.cities = data;
      this.selectSport.value = this.generalService.idSport;
  
      if (this.generalService.idCity) {
        const selectedChip = this.cities.find(city => city.id === this.generalService.idCity);
        if (selectedChip) {
          this.selected = true;
        }
      }
    });
    if (this.generalService.idSport) {
      this.idSport = this.generalService.idSport;
      this.clubService.getPageFilterSportAndCity(this.pageIndex, this.pageSize, this.generalService.idSport, this.generalService.idCity).subscribe(data => {
        this.clubs = data.content;
    
        // Actualizar el número de páginas
        this.clubService.getNumClubs(this.generalService.idSport, this.generalService.idCity).subscribe(data => {      
          this.pages = Math.ceil(data / 1);
        });
      });
    }    
  }

  citiesSport(id) {
    this.selected = false;
    this.cities = [];
    this.idSport = id;
    this.generalService.idSport = id;
    this.generalService.idCity = null;
    this.generalService.getCitiesSports(id).subscribe(data => {
      this.cities = data;      
      this.clubs = [];
    });
  }

  clubCities(city) {
    this.clubs = [];
    this.selected = true;
    this.city = city;
    this.generalService.idCity = city;
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
