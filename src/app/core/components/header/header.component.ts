import { CandidatesACPComponent } from './../../../main-modules/modules/network-planning/rf-planning/nominal-generation-strategy/create-page/candidates-acp/candidates-acp.component';
import { KpiDetailsComponent } from './../../../main-modules/main-layer/kpi-details/kpi-details.component';
import { SavePolygonPopupComponent } from './../commonPopup/save-polygon-popup/save-polygon-popup.component';

import { Component, OnInit, Inject, ViewChild, HostListener, OnChanges } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { map, startWith, timeout } from 'rxjs/operators';
import { AuthenticationService } from '../../../_services/authentication.service';
import { User } from '../../../_models/user'; import { MatSelectModule } from "@angular/material/select";
import * as _ from "lodash";
import { OverlayContainer } from '@angular/cdk/overlay';
import { SideNavService } from 'src/app/_services/side-nav.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { AlarmsPopupComponent } from '../../../modules/components/alarms-popup/alarms-popup.component';
import { CapacityComponent } from '../../../modules/components/capacity/capacity.component';
import { ConfigurationComponent } from '../../../modules/components/configuration/configuration.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

export class searchList {
  constructor(
    public name: string,
    public linkurl: string,
    public icon: string
  ) { }
}
export class recentVisitList {
  constructor(
    public name: string,
    public linkurl: string,
    public icon: string
  ) { }
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;

  switchJCP2 : boolean= false;
  
  onChangeswitch(obj) {
    console.log(obj,"obj");
    
      if (this.switchJCP2 == true) {
         setTimeout(() => {
          // let that = this;
          let win = window.open('http://10.157.250.232/#/layers', '_self', 'MsgWindow');
          win.focus();
         }, 500);

      }
  };
  ////authentication/////
  currentUser: User;
  ////authentication/////

  ////////breadcrums////////////
  route: string;
  mainHeaderName: string;
  breadcrumbList = [];
  routeLinks: number;
  count: number;
  ////////breadcrums////////////

  ///////////search//////////////////

  stateCtrl: FormControl;
  stateForm: FormGroup = this._formBuilder.group({
    stateCtrl: '',
  });
  filteredStates: Observable<any[]>;
  filteredStatesVisited: Observable<any[]>;
  searchlist: searchList[] = [
    {
      name: "LSMR",
      linkurl: "Samsung",
      icon: "ic ic-dashboard2"
    },
    {
      name: "LSMR Re-Homing",
      linkurl: "Planning and Development",
      icon: "ic ic-dashboard2"
    }
  ];

  recentvisitlist: recentVisitList[] = [
    {
      name: "RET Change",
      linkurl: "RET Change",
      icon: "ic ic-configuration"
    },
    {
      name: "RFOC Summary Report",
      linkurl: "RFOC Summary Report",
      icon: "ic ic-dashboard2"
    },
    {
      name: "LSMR",
      linkurl: "Samsung",
      icon: "ic ic-dashboard2"
    },
    {
      name: "Infill Planning",
      linkurl: "Infill Planning",
      icon: "zmdi zmdi-layers"
    },
    {
      name: "Report Builder",
      linkurl: "Report Builder",
      icon: "ic ic-performance1"
    },
  ];

  //////////search///////////////


  public addClassNew = false;
  public showNominalHeader = false;
  public testval;
  message: string;
  routeUrlLinkPage;
  truncatedBCStr;

  ngOnChanges() {
    // Add an event listener
    document.addEventListener("close-side-bar", () => {
      this.sideNavService.close();
    });
  }

  constructor(
    public dialog: MatDialog,
    private datashare: DataSharingService,
    private _formBuilder: FormBuilder, private location: Location,
    private router: Router, private authenticationService: AuthenticationService,
    @Inject(DOCUMENT) private document: any, private overlayContainer: OverlayContainer,
    private sideNavService: SideNavService,
    public matDialog: MatDialog, public matselect: MatSelectModule,
    private http: HttpClient) {
    window.addEventListener("close-side-bar", () => {
      this.sideNavService.close();
    });

    /////////////breadcrums////////////////////
    router.events.subscribe((val) => {
      if (location.path() !== '') {

        this.route = location.path();
        this.route.split('-').join(' ');
        let spaceAddURL = this.route.split('-').join(' ');

        var maxLength = 75;
        if (spaceAddURL.length > maxLength) {
          this.truncatedBCStr = "..." + (spaceAddURL.substring(spaceAddURL.length - (maxLength - 4), spaceAddURL.length)).split('/');
          let truncatedBCRemoveStrToArr = this.truncatedBCStr.split(",");
          this.breadcrumbList = truncatedBCRemoveStrToArr;
          this.breadcrumbList = this.breadcrumbList.filter(function (entry) { return entry.trim() != ''; });
          this.breadcrumbList.forEach(ele => {
            this.mainHeaderName = ele;
          });
        } else {
          this.breadcrumbList = spaceAddURL.split('/');
          this.breadcrumbList = this.breadcrumbList.filter(function (entry) { return entry.trim() != ''; });
          this.breadcrumbList.forEach(ele => {
            this.mainHeaderName = ele;
          });
        }

        this.datashare.currentMessage.subscribe((message) => {
          if (message == {} || message == false) {
            this.addClassNew = false;
          } else {
            this.addClassNew = true;
          }
        });


        this.datashare.currentMessageDialog.subscribe((val:any) => {
          if (val.headerNominal == true) {
            this.showNominalHeader = true;
          } else {
            this.showNominalHeader = false;
          }
        });
        
        this.count = this.breadcrumbList.length;
      } else {
        this.route = 'JCP';
      }
    });

    /////////////breadcrums////////////////////

    ///////////user authenticat/////////////
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    ///////////user authenticat/////////////

    ///////////////Search////////////////
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(""),
      map(state => (state ? this.filterStates(state) : this.searchlist.slice()))
    );
    this.filteredStatesVisited = this.stateCtrl.valueChanges.pipe(
      startWith(""),
      map(state => (state ? this.filterStatesVisited(state) : this.recentvisitlist.slice()))
    );
    //////////////search///////////////////
  }

  toggleActive = true;

  toggleSidenav() {

    this.toggleActive = !this.toggleActive;
    this.datashare.changeMessage(this.toggleActive)
  }

  //////////////search///////////////////
  filterStates(name: string) {
    return this.searchlist.filter(
      state => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  filterStatesVisited(name: string) {
    return this.recentvisitlist.filter(
      state => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  addClassActiveSearch = false;
  onEnter(evt: any) {
    if (evt.source.selected) {
    }
  }

  search(item) {
    this.addClassActiveSearch = !this.addClassActiveSearch;
    if (item._isOpen) {
    }
  }
  //////////////search///////////////////

  ///////////////expand screen//////////////////////
  elem;
  expandScreen = false;
  openFullscreen() {
    console.log(" this.sideNavService", this.sideNavService)
    this.sideNavService.close();
    this.expandScreen = true;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    this.sideNavService.open();
    this.expandScreen = false;
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  @HostListener("document:fullscreenchange", []) closefullScreenEscape() {
    if (!document.fullscreenElement) {
      this.expandScreen = false;
    }
  }

  @HostListener("document:webkitfullscreenchange", []) closefullScreenEscapeSafari() {
    if (!this.document.webkitFullscreenElement) {
      this.expandScreen = false;
    }
  }

  @HostListener("document:mozfullscreenchange", []) closefullScreenEscapeFF() {
    if (!this.document.mozFullScreenElement) {
      this.expandScreen = false;
    }
  }

  @HostListener("document:msfullscreenchange", []) closefullScreenEscapeIE() {
    if (!this.document.msFullscreenElement) {
      this.expandScreen = false;
    }
  }
  ///////////////expand screen//////////////////////

  /////////User logout////////////
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  /////////User logout////////////

  ///////////Notification/////////////////
  notificationsList = [
    {
      iconMod: "ic ic-imsi_Work-Orders",
      statusMod: "Now",
      name: "Reports",
      detailsMod: "RepODSC Planning Report has been generatedorts",
      hideMe: true
    },
    {
      iconMod: "ic ic-imsi_Work-Orders",
      statusMod: "15m",
      name: "Work Order",
      detailsMod: "RWork order ‘ WO-IM-MFN-AB-1023’ has been assigned to you epODSC Planning Report has been generatedorts",
      hideMe: false
    },
    {
      iconMod: "ic ic-imsi_Work-Orders",
      statusMod: "Yesterday",
      name: "Reports",
      detailsMod: "Your Subscribed report ‘RET WO status Report is available",
      hideMe: true
    },
    {
      iconMod: "ic ic-imsi_Work-Orders",
      statusMod: "Apr 10, 2020",
      name: "Dashboards",
      detailsMod: "Check out the new features available on JCP",
      hideMe: true
    },
    {
      iconMod: "ic ic-imsi_Work-Orders",
      statusMod: "Now",
      name: "Layers",
      detailsMod: "RepODSC Planning Report has been generatedorts",
      hideMe: false
    },
    {
      iconMod: "ic ic-imsi_Work-Orders",
      statusMod: "Yesterday",
      name: "Dashboards",
      detailsMod: "Your Subscribed report ‘RET WO status Report is available",
      hideMe: false
    }
  ]

  public randomNotificationCount: number;

  onLoad() {

    var divLength = this.notificationsList.length;
    this.randomNotificationCount = Math.floor(Math.random() * (20 - divLength) + divLength);
  }


  olderArr = [{
    iconMod: "ic ic-imsi_Work-Orders",
    statusMod: "15m",
    name: "Work Order",
    detailsMod: "RWork order ‘ WO-IM-MFN-AB-1023’ has been assigned to youepODSC Planning Report has been generatedorts",
    hideMe: true,
    oldNote: true
  }
  ]
  public oldNoteName;
  showOlderNoteFunc(notificationsList) {
    for (let index = 0; index < this.olderArr.length; index++) {
      const eleOldNote = this.olderArr[index];
      this.oldNoteName = eleOldNote.oldNote;
      notificationsList.push(eleOldNote);
    }


  }

  viewAllNoteFunc(notificationsList) {

    _.forEach(notificationsList, function (value) {

      if (value.hideMe == false) {
        value.hideMe = true;
      }
    });

  }

  public selectedNameMod: string = "All Notifications";

  filterDataOnSelection = false;
  filterDataArr = [];

  allNameNoteFunc(item) {

    if (item.value == "All Notifications") {
      this.filterDataOnSelection = false;
    } else {
      var filterData = this.notificationsList.filter(t => t.name == item.value);

      this.filterDataOnSelection = true;
      this.filterDataArr = filterData;
    }

  }
  ///////////Notification/////////////////

  //////////BreadCrums////////////////
  breadcrumbFun(val) {


    if (val == "ExecutiveSummary" || val == "Dashboard") {
      this.router.navigate(['/', 'Dashborad', 'ExecutiveSummary']).then(val => {
      }, err => {

      });
    } else {
      this.router.navigate(['/', 'Dashborad', 'ExecutiveSummary']).then(val => {
      }, err => {

      });
    }

  }


  reportWizardFuction() {
    this.router.navigate(['/', 'JCP', 'Reports & Dashboard', 'Report Wizard']).then(val => {
    }, err => {

    });
  }

  myreportFuction() {
    this.router.navigate(['/', 'JCP', 'Reports & Dashboard', 'My Reports']).then(val => {
    }, err => {

    });
  }

  //////////BreadCrums////////////////

  ngOnInit() {
    this.elem = document.documentElement;
    this.onLoad();
    this.datashare.currentMessage.subscribe((message) => {
      this.testval = message;
    });
  }

  terminateRunningTime(){
    this.datashare.sendTimestampPopupOpen$.subscribe((time)=>{
      let currentTime = this.setCurrentTimestamp();
      let pageTime = time;
      let timeSpent = this.calculateTimeDifference(currentTime, pageTime);
      let timeObject = {
        timeSpent: timeSpent,
        screenId: 703,
        userId:7722778
      };
      this.datashare.sendCalcuateTimeToHomeJcpPageFn(timeObject)
    });
  }

  setCurrentTimestamp() {
    const currentdate = Date.now();
    const timestamp = moment(currentdate);
    timestamp.format('h:mm:ss');
    return timestamp;
  }

  calculateTimeDifference(endTime, startTime) {
    let totalHours = endTime.diff(startTime, 'hours');
    let totalMinutes = endTime.diff(startTime, 'minutes');
    let totalSeconds = endTime.diff(startTime, 'seconds');
    let clearMinutes = totalMinutes % 60;
    let clearSeconds = totalSeconds % 60;

    let hours = `${totalHours}`.length == 1 ? "0" + `${totalHours}` : totalHours
    let minutes = `${clearMinutes}`.length == 1 ? "0" + `${clearMinutes}` : clearMinutes;
    let seconds = `${clearSeconds}`.length == 1 ? "0" + `${clearSeconds}` : clearSeconds

    let time = hours + ":" + minutes + ":" + seconds;
    return time;
  }

  clickMenu() {
    this.sideNavService.toggle();
  }

  openDialogAlarms() {
    const dialogRef = this.dialog.open(AlarmsPopupComponent, {
      width: "850px",
      panelClass: "material-dialog-container",

    });

  };

  openDialogCapacity(): void {
    const dialogRef = this.dialog.open(CapacityComponent, {
      width: "850px",
      panelClass: "material-dialog-container",
    });
  };

  // closeDialog(){
  //   this.dialogRef.close();
  // }



  openDialogConfiguration() {
    const dialogRef = this.matDialog.open(ConfigurationComponent, {
      width: "850px",
      panelClass: "material-dialog-container",
    });
  };

  saveNominalPloy(){
    const dialogRef = this.matDialog.open(SavePolygonPopupComponent, {
      width: "500px",
      height:'190px',
      panelClass: "material-dialog-container",
    });
  }

  candidatesACP(){
    var kpiDetailsListDialogRef = {
      width: '385px',
      height: '510px',
      position: { bottom: '0px', right: "55px" },
      panelClass: "acp-table-view-layers-dialog-container",
      backdropClass: 'cdk-overlay-transparent-backdrop',
      disableClose: true,
      hasBackdrop: true
    }
    const dialogRef = this.dialog.open(CandidatesACPComponent, kpiDetailsListDialogRef);

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });
  }

  backPageRout() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
