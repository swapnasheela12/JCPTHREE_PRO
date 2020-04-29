
import { Component, OnInit, Injectable, Inject, Input, ViewChild, OnChanges, HostListener, ViewEncapsulation } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { MatSidenav } from '@angular/material';
import { BehaviorSubject, Observable, of as observableOf, from } from "rxjs";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { AuthenticationService } from '../../../_services/authentication.service';
import { User } from '../../../_models/user';


declare var $: any;
import * as _ from "lodash";
import { OverlayContainer } from '@angular/cdk/overlay';


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
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
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
      name: "InfILL Planning",
      linkurl: "InfILL Planning",
      icon: "zmdi zmdi-layers"
    },
    {
      name: "REPORT BUILDER",
      linkurl: "REPORT BUILDER",
      icon: "ic ic-performance1"
    },
  ];

  //////////search///////////////





  constructor(private _formBuilder: FormBuilder, private location: Location, private router: Router, private authenticationService: AuthenticationService, @Inject(DOCUMENT) private document: any, private overlayContainer: OverlayContainer) {
    router.events.subscribe((url: any) => console.log(url));
    console.log(router.url)

    /////////////breadcrums////////////////////
    router.events.subscribe((val) => {
      if (location.path() !== '') {
        this.route = location.path();
        this.route.split('%20').join(' ');
        let spaceAddURL = this.route.split('%20').join(' ')
        this.breadcrumbList = spaceAddURL.split('/');
        this.breadcrumbList = this.breadcrumbList.filter(function (entry) { return entry.trim() != ''; });
        console.log(this.breadcrumbList, "this.breadcrumbList");
        this.breadcrumbList.forEach(ele => {
          this.mainHeaderName = ele;
        });
        console.log(this.mainHeaderName);

        // this.mainHeaderName = this.breadcrumbLis.pop();
        this.count = this.breadcrumbList.length;
      } else {
        this.route = 'Home';
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

  //////////////search///////////////////
  filterStates(name: string) {
    return this.searchlist.filter(
      state => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  filterStatesVisited(name: string) {
    console.log(name, "name");

    return this.recentvisitlist.filter(
      state => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  addClassActiveSearch = false;
  onEnter(evt: any) {
    if (evt.source.selected) {
      console.log("bahar");
    }
  }

  search(item) {
    this.addClassActiveSearch = !this.addClassActiveSearch;
    if (item._isOpen) {
      console.log("under");
    }
  }
  //////////////search///////////////////


  ///////////////expand screen//////////////////////
  elem;
  expandScreen = false;
  openFullscreen() {
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
  console.log("load");
  var divLength = this.notificationsList.length;
  this.randomNotificationCount = Math.floor(Math.random() * (20 - divLength) + divLength);
  console.log(this.randomNotificationCount, "randomDiv");
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
  console.log(notificationsList, "list");
  _.forEach(notificationsList, function (value) {
    console.log(value, "val");
    if (value.hideMe == false) {
      value.hideMe = true;
    }
  });

}

public selectedNameMod: string = "All Notifications";

filterDataOnSelection = false;
filterDataArr = [];

allNameNoteFunc(item) {
  console.log(item, "item");
  if (item.value == "All Notifications") {
    this.filterDataOnSelection = false;
  } else {
    var filterData = this.notificationsList.filter(t => t.name == item.value);
    console.log(filterData, "filterData");
    this.filterDataOnSelection = true;
    this.filterDataArr = filterData;
  }

}
///////////Notification/////////////////

//////////BreadCrums////////////////
breadcrumbFun(val) {
  console.log(val, "val");

  if (val == "ExecutiveSummary" || val == "Dashboard") {
    this.router.navigate(['/', 'Dashborad', 'ExecutiveSummary']).then(val => {
    }, err => {
      console.log(err) // when there's an error
    });
  } else {
    this.router.navigate(['/', 'Dashborad', 'ExecutiveSummary']).then(val => {
    }, err => {
      console.log(err) // when there's an error
    });
  }

}


myreportFuction(){
  this.router.navigate(['/','Home', 'Reports & Dashboard', 'Report Wizard']).then(val => {
  }, err => {
    console.log(err) // when there's an error
  });
}

//////////BreadCrums////////////////

  ngOnInit() {
    this.elem = document.documentElement;
    this.onLoad();

  }

}
