import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jcpBeta-spider',
  templateUrl: './spider.component.html',
  styleUrls: ['./spider.component.scss']
})
export class SpiderComponent implements OnInit {
  @Input('mydata') mydata;
  constructor() { }

  ngOnInit() {
    console.log("ydta", this.mydata);
  }

}
