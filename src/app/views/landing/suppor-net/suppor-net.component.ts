import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppor-net',
  templateUrl: './suppor-net.component.html',
  styleUrls: ['./suppor-net.component.css']
})
export class SupporNetComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
