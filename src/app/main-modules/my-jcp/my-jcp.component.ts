import { Component, OnInit } from '@angular/core';

export interface Tile {
  // color: string;
  cols: number;
  rows: number;
  text: string;
  
}

@Component({
  selector: 'app-my-jcp',
  templateUrl: './my-jcp.component.html',
  styleUrls: ['./my-jcp.component.scss']
})
export class MyJcpComponent implements OnInit {

  myJcpListTile: Tile[] = [
    {
      text: 'one', cols: 12, rows: 2,
      // childTemplateArr: [{ childUrl: './src/app/main-modules/my-jcp/test.html' }],
    },
    {
      text: 'two', cols: 6, rows: 3, 
      // childTemplateArr: [{ childUrl: '<second-page></second-page>' }],
    },
    {
      text: 'three', cols: 6, rows: 2, 
      // childTemplateArr: [{ childUrl: 'src/app/main-modules/my-jcp/test.html' }],
    },
    {
      text: 'four', cols: 6, rows: 4,
      // childTemplateArr: [{ childUrl: 'src/app/main-modules/my-jcp/test.html' }],
    },
    {
      text: 'five', cols: 6, rows: 3,
      // childTemplateArr: [{ childUrl: 'src/app/main-modules/my-jcp/test.html' }],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

