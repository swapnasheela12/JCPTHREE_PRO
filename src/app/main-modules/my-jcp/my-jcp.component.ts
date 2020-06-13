import { Component, OnInit, Inject, ViewChild, ViewChildren, ElementRef, QueryList, AfterViewInit , OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { moveItemInArray, CdkDragDrop, CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import {startWith , map , switchMap , tap} from 'rxjs/operators';
import {merge,Subscription } from 'rxjs';
declare var $: any;
const speed = 10;
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
export class MyJcpComponent implements OnInit  {

  myJcpListTile: Tile[] = [
    {
      text: 'one', cols: 6, rows: 3,
    },
    {
      text: 'two', cols: 6, rows: 3,
    },
    {
      text: 'three', cols: 6, rows: 3,
    },
    {
      text: 'four', cols: 6, rows: 2,
    },
    {
      text: 'five', cols: 6, rows: 4,
    },
    {
      text: 'six', cols: 6, rows: 3,
    }
  ];


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.myJcpListTile, event.previousIndex, event.currentIndex);
  }

  watcher: Subscription;
  activeMediaQuery = '';
  desired_columns;
  desired_rowHeight;
  constructor(public mediaObserver: MediaObserver) {
    var divHeight;
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if (change.mqAlias == 'xs') {
        console.log('xs');
        
        divHeight = $("#my-jcp-setting-container-id").height();
        this.myJcpListTile;
        this.desired_columns = 12;
        this.desired_rowHeight = "fit";
      }
      else if (change.mqAlias == 'sm') {
        console.log('sm');
        divHeight = $("#my-jcp-setting-container-id").height();
        this.myJcpListTile;
        this.desired_columns = 12;
      }
      else if (change.mqAlias == 'md') {
        console.log('md');
        divHeight = $("#my-jcp-setting-container-id").height();
        this.myJcpListTile;
        
      } else {
        console.log('lg');
        divHeight = $("#my-jcp-setting-container-id").height();
        this.myJcpListTile;
        if (divHeight <= 625) {
          this.desired_rowHeight = "1:1";
        } else {
          this.desired_rowHeight = "fit";
        }
      }
    });

  }

  ngOnInit(): void {
  }


}

