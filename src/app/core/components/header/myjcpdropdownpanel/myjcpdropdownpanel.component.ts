import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

declare var $: any;

export interface DialogData {
  animal: string;
  name: string;
}

interface State {
  abbr: string;
  name: string;
} 

@Component({
  selector: 'app-myjcpdropdownpanel',
  templateUrl: './myjcpdropdownpanel.component.html',
  styleUrls: ['./myjcpdropdownpanel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyjcpdropdownpanelComponent implements OnInit {
  panelOpenState = false;
  contentClass = false;
  public jioStateCtrl: FormControl = new FormControl();
  public jioStateFilterCtrl: FormControl = new FormControl();

  stateList = [
    {name: 'Maharashtra', abbr: 'MH'},
    {name: 'Karnataka', abbr: 'KN'},
    {name: 'Bihar', abbr: 'BR'},
    {name: 'Gujarat', abbr: 'GJ'} 
  ]

  cardListMyJcpSettings = [
    {
      id: 0,
      nameCard: "Alarms Live",
      vision: true,
      countNode: 6,
      itemsListAlarms: [
        { name: "Macro​", disabled: false },
        { name: "ESC", disabled: false },
        { name: "ISC", disabled: false },
        { name: "OSC", disabled: false },
        { name: "IBS/DAS", disabled: false },
        { name: "Wi- Fi AP’s​", disabled: true }
      ]
    },
    {
      id: 1,
      nameCard: "Performance KPI",
      vision: true,
      countNode: 4,
      itemsListAlarms: [
        { name: "Macro​", disabled: false },
        { name: "OSC", disabled: false },
        { name: "IBS/DAS", disabled: false },
        { name: "Wi- Fi AP’s​", disabled: true }
      ]
    },
    {
      id: 2,
      nameCard: "Planning: On- Air Site",
      vision: true,
      countNode: 6,
      itemsListAlarms: [
        { name: "Macro​", disabled: false },
        { name: "ESC", disabled: false },
        { name: "ISC", disabled: false },
        { name: "OSC", disabled: false },
        { name: "IBS/DAS", disabled: false },
        { name: "Wi- Fi AP’s​", disabled: true }
      ]
    },
    {
      id: 3,
      nameCard: "Backhaul Violators",
      vision: false,
      countNode: 1,
      itemsListAlarms: [
        { name: "Wi- Fi AP’s​", disabled: true }
      ]
    },
    {
      id: 4,
      nameCard: "Customers",
      vision: false,
      countNode: 3,
      itemsListAlarms: [
        { name: "Macro​", disabled: true },
        { name: "ISC", disabled: true },
        { name: "Wi- Fi AP’s​", disabled: true }
      ]
    }
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.restoreFocus = false;
    dialogConfig.autoFocus = false;
    dialogConfig.role = 'dialog';
    dialogConfig.width = '100px';
    dialogConfig.height = '100px';
    let dialogRef: MatDialogRef<SettingsDialogComponent> = this.dialog.open(SettingsDialogComponent);
  }
  
  nodeEnableDisable(item, val, idx, index) {
    item.disabled = !item.disabled;
    if (val.id == idx) {
      if (item.disabled == true) {
        this.contentClass = true;
        $("#mat-expansion-panel-header-" + idx).removeClass("bgAndColor-My-jcp-Add");
        $("#mat-expansion-panel-header-" + idx).addClass("bgAndColor-My-jcp-Remove");
        $("#cdk-accordion-child-" + idx).removeClass("bgAndColor-My-jcp-Add");
        $("#cdk-accordion-child-" + idx).addClass("bgAndColor-My-jcp-Remove");
      }
      else {
        this.contentClass = false;
        $("#mat-expansion-panel-header-" + idx).addClass("bgAndColor-My-jcp-Add");
        $("#mat-expansion-panel-header-" + idx).removeClass("bgAndColor-My-jcp-Remove");
        $("#cdk-accordion-child-" + idx).addClass("bgAndColor-My-jcp-Add");
        $("#cdk-accordion-child-" + idx).removeClass("bgAndColor-My-jcp-Remove");
      }
    }
  }
}