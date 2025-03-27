import { Component, OnInit } from '@angular/core';
interface site {
 
  viewValue: string;
}
@Component({
  selector: 'app-enbsc',
  templateUrl: './enbsc.component.html',
  styleUrls: ['./enbsc.component.scss']
})
export class EnbscComponent implements OnInit {
 
  site: site[] = [
    { viewValue: 'Macro'},
    {viewValue: 'Indoor Small Cell'},
    { viewValue: 'Outdoor Small Cell'}
  ];
  constructor() { }

  ngOnInit(): void {
  }


 
}
