import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grow-life',
  templateUrl: './grow-life.component.html',
  styleUrls: ['./grow-life.component.css']
})
export class GrowLifeComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
