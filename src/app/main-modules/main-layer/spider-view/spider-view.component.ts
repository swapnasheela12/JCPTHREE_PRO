import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-spider-view',
  templateUrl: './spider-view.component.html',
  styleUrls: ['./spider-view.component.scss']
})
export class SpiderViewComponent implements OnInit {

  hierarchy = {
    "name": "Top Level",
    "children": [
      {
        name: 'Alarms',
        value: 5,
        color: '#ED1C24',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf1fe',
        // eventname: 'sites-tree-alarms'
        eventname: 'sites-tree-onairalarms'
      }, {
        name: 'Neighbours',
        value: 5,
        color: '#29ABE2',
        font: 'icomoon',
        fontvalue: '\ue919',
        eventname: 'sites-tree-neighbours'
      }, {
        name: 'KPI\'s',
        value: 5,
        color: '#F7931E',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf334',
        eventname: 'sites-tree-ranperformace'
      }, {
        name: 'Properties',
        value: 5,
        color: '#8CC63F',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        eventname: 'sites-tree-properties'
      },
      {
        name: 'Capacity',
        value: 5,
        color: '#009245',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf323',
        eventname: 'sites-tree-capacity'
      }, {
        name: 'Configuration',
        value: 5,
        color: '#662D91',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf1ed',
        eventname: 'sites-tree-configuration'
      }, {
        name: 'Indoor Analysis',
        value: 5,
        color: '#29ABE2',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf175',
        eventname: 'sites-tree-indoor'
      }
      , {
        name: 'Cell Coverage Map',
        value: 5,
        color: '#ED1C24',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf299',
        eventname: 'overshooting-coverage-map'
      }, {
        name: 'Create Workorder',
        value: 5,
        color: '#8dc63f',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf222',
        eventname: 'sites-tree-createworkorder'
      }, {
        name: 'See Routers',
        value: 5,
        color: '#dc2050',
        font: 'icomoon',
        fontvalue: '\uebcc',
        eventname: 'see-routers'
      }
    ]
  };

  constructor(private modalService: NgbModal, private dialogRef: MatDialogRef<SpiderViewComponent>,
    public dialog: MatDialog) { }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void { }

}
