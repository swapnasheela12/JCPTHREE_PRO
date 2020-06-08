import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  childTemplateArr: [{
    childUrl: string;
  }];
}

@Component({
  selector: 'app-my-jcp',
  templateUrl: './my-jcp.component.html',
  styleUrls: ['./my-jcp.component.scss']
})
export class MyJcpComponent implements OnInit {

  myJcpListTile: Tile[] = [
    {
      text: 'one', cols: 2, rows: 1,color: 'lightblue',
      childTemplateArr: [{ childUrl: 'src/app/main-modules/my-jcp/test.html' }],
    },
    {
      text: 'Two', cols: 2, rows: 2, color: 'lightgreen',
      childTemplateArr: [{ childUrl: 'src/app/main-modules/my-jcp/test.html' }],
    },
    {
      text: 'Three', cols: 2, rows: 1, color: 'lightblue',
      childTemplateArr: [{ childUrl: 'src/app/main-modules/my-jcp/test.html' }],
    },
    {
      text: 'Four', cols: 2, rows: 1, color: 'lightpink',
      childTemplateArr: [{ childUrl: 'src/app/main-modules/my-jcp/test.html' }],
    },
    {
      text: 'Four', cols: 2, rows: 1, color: '#DDBDF1',
      childTemplateArr: [{ childUrl: 'src/app/main-modules/my-jcp/test.html' }],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
