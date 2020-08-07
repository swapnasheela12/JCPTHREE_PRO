import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deletebutton',
  templateUrl: './deletebutton.component.html',
  styleUrls: ['./deletebutton.component.scss']
})
export class DeletebuttonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  params;

  refresh(params?: any): boolean {
    return true;
  }


 
  agInit(params): void {
    this.params = params;
    

    };
}
