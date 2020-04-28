
import { Component, OnInit, Injectable, Inject, Input, ViewChild, OnChanges, HostListener, ViewEncapsulation } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { MatSidenav } from '@angular/material';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './example-data';
import { BehaviorSubject, Observable, of as observableOf, from } from "rxjs";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

declare var $: any;
import * as _ from "lodash";
import { OverlayContainer } from '@angular/cdk/overlay';

// import { FilterUniquePipe } from '../pipes/filterUnique/filter-unique.pipe'

export interface FileNode {

  name: string;
  link: string;
  icon: string;
  children?: FileNode[];
}

export interface menuSidebar {

  name: string;
  link: string;
  icon: string;
  children?: menuSidebar[];
}
export interface menuTreeSidebar {

  name: string;
  icon: string;
  link: string;
  level: number;
  expandable: boolean;
}

/** Flat node with expandable and level information */
export interface TreeNode {

  name: string;
  icon: string;
  link: string;
  level: number;
  expandable: boolean;
}

// export interface User {
//   name: string;
// }
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
// export interface StateGroup {
//   type: string;
//   letter: string;
//   names: string[];
// }

// export const _filter = (opt: string[], value: string): string[] => {
//   const filterValue = value.toLowerCase();

//   return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
// };


@Component({
  selector: "app-home-jcp-three",
  templateUrl: "./home-jcp-three.component.html",
  styleUrls: ["./home-jcp-three.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeJcpThreeComponent implements OnInit {


  //////////breadcrums///////////////
  breadcrumbLinksList: string;
  urlPathPage: string;
  //////////breadcrums///////////////


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


  //////////side menu/////////////////////
  sidenavWidth = 4;
  ngStyle: string;
  expanded: boolean;

  // noderadiobutt : boolean;
  public chosenItem: boolean;
  public isCollapsed = false;
  private userName: string = "";
  private userActiveRole: string = "";

  currentUser: User;

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  @Input()
  openNav: boolean;



  menulist = [
    {
      name: 'Home',
      link: 'home',
      icon: 'fas fa-home',
      children: []
    }, {
      name: 'Modules',
      link: 'Modules',
      icon: 'fas fa-home',
      children: [{
        name: 'Configuration Management',
        link: 'ConfigurationManagement',
        icon: 'fas fa-home',
        children: [{
          name: 'Planned Event Calendar',
          link: 'PlannedEventCalendar',
          icon: 'fas fa-home',
          children: []
        }, {
          name: 'Config Change',
          link: 'ConfigChange',
          icon: 'fas fa-home',
          children: [
            {
              name: 'LSMR Rehoming',
              link: 'LSMRRehoming',
              icon: 'fas fa-home',
              children: [
                {
                  name: 'Domain',
                  link: 'Domain',
                  icon: 'fas fa-home',
                  children: [
                    {
                      name: 'Vendor',
                      link: 'Vendor',
                      icon: 'fas fa-home',
                      children: [{
                        name: 'Node',
                        link: 'Node',
                        icon: 'fas fa-home',
                        children: []
                      },]
                    },
                  ]
                },
              ]
            },
            {
              name: 'Trial Management',
              link: 'TrialManagement',
              icon: 'fas fa-home',
              children: [
                {
                  name: 'Domain',
                  link: 'Domain',
                  icon: 'fas fa-home',
                  children: [
                    {
                      name: 'Vendor',
                      link: 'Vendor',
                      icon: 'fas fa-home',
                      children: [{
                        name: 'Node',
                        link: 'Node',
                        icon: 'fas fa-home',
                        children: []
                      },]
                    },
                  ]
                },
              ]
            },
          ]
        },
        {
          name: 'Audit and Query',
          link: 'AuditandQuery',
          icon: 'fas fa-home',
          children: [
            {
              name: 'RAN',
              link: 'RAN',
              icon: 'fas fa-home',
              children: [
                {
                  name: 'Query',
                  link: 'Query',
                  icon: 'fas fa-home',
                  children: [
                    {
                      name: 'Discrepancy Library',
                      link: 'DiscrepancyLibrary',
                      icon: 'fas fa-home',
                      children: []
                    },
                  ]
                },
              ]
            },
            {
              name: 'Core',
              link: 'Core',
              icon: 'fas fa-home',
              children: [
                {
                  name: 'Compare',
                  link: 'Compare',
                  icon: 'fas fa-home',
                  children: []
                },
                {
                  name: 'Discrepancy',
                  link: 'Discrepancy',
                  icon: 'fas fa-home',
                  children: []
                },
                {
                  name: 'Query',
                  link: 'Query',
                  icon: 'fas fa-home',
                  children: []
                },
              ]
            },
          ]
        },
        ]
      },
      {
        name: 'Analytics',
        link: 'analytics',
        icon: 'fas fa-home'
      },
      {
        name: 'Fault Management',
        link: 'faultmanagement',
        icon: 'fas fa-home',
      }]
    }
    , {
      name: 'Reports & Dashboards',
      link: 'reports&dashboards',
      icon: 'fas fa-home',
      children: []
    }
    , {
      name: 'Work Orders',
      link: 'workorders',
      icon: 'fas fa-home',
      children: []
    }
    , {
      name: 'Administration',
      link: 'administration',
      icon: 'fas fa-home',
      children: []
    }
    , {
      name: 'My JCP',
      link: 'myJCP',
      icon: 'fas fa-home',
      children: []
    }
  ]


  childMenuListFirst = false;
  childFirstArr = [];
  menuListFunc(item) {
    console.log(item, "item");
    // console.log(this.parentArr, "this.parentArr");
    var parentFirstArr = [];
    if (item.children.length != 0) {
      _.forEach(item.children, function (value) {
        // console.log(value,"value");
        parentFirstArr.push(value);
      });
      console.log(parentFirstArr, "parentFirstArr 11111111");
      this.childFirstArr = parentFirstArr;
      this.childMenuListFirst = true;
      // this.childMenuListFirst = false;

    }
  }


  childMenuListSecond = false;
  childSecondArr = [];
  firstMenuListFunc(item) {
    console.log(item, "item");
    // console.log(this.parentArr, "this.parentArr");

    var parentSecondArr = [];
    if (item.children.length != 0) {
      _.forEach(item.children, function (value) {
        // console.log(value,"value");
        parentSecondArr.push(value);
      });
      console.log(parentSecondArr, "parentFirstArr 22222222");
      this.childSecondArr = parentSecondArr;
      // this.childMenuListFirst = false;
      this.childMenuListSecond = true;
    }
  }


  childMenuListThree = false;
  childThreeArr = [];
  secondMenuListFunc(item) {
    console.log(item, "item");
    // console.log(this.parentArr, "this.parentArr");

    var parentThreeArr = [];
    if (item.children.length != 0) {
      _.forEach(item.children, function (value) {
        // console.log(value,"value");
        parentThreeArr.push(value);
      });
      console.log(parentThreeArr, "parentThreeArr 33333");
      this.childThreeArr = parentThreeArr;
      // this.childMenuListFirst = false;
      this.childMenuListThree = true;
    }
  }

  childMenuListFourth = false;
  childFourthArr = [];
  threeMenuListFunc(item) {
    console.log(item, "item");
    // console.log(this.parentArr, "this.parentArr");

    var parentThreeArr = [];
    if (item.children.length != 0) {
      _.forEach(item.children, function (value) {
        // console.log(value,"value");
        parentThreeArr.push(value);
      });
      console.log(parentThreeArr, "parentThreeArr 4444");
      this.childFourthArr = parentThreeArr;
      // this.childMenuListFirst = false;
      this.childMenuListFourth = true;
    }
  }

  childMenuListFifth = false;
  childFifthArr = [];
  fourthMenuListFunc(item) {
    console.log(item, "item");
    // console.log(this.parentArr, "this.parentArr");

    var parentThreeArr = [];
    if (item.children.length != 0) {
      _.forEach(item.children, function (value) {
        // console.log(value,"value");
        parentThreeArr.push(value);
      });
      console.log(parentThreeArr, "parentThreeArr 5555");
      this.childFifthArr = parentThreeArr;
      // this.childMenuListFirst = false;
      this.childMenuListFifth = true;
    }
  }

  childMenuListSixth = false;
  childSixthArr = [];
  fifthMenuListFunc(item) {
    console.log(item, "item");
    // console.log(this.parentArr, "this.parentArr");

    var parentThreeArr = [];
    if (item.children.length != 0) {
      _.forEach(item.children, function (value) {
        // console.log(value,"value");
        parentThreeArr.push(value);
      });
      console.log(parentThreeArr, "parentThreeArr 5555");
      this.childSixthArr = parentThreeArr;
      // this.childMenuListFirst = false;
      this.childMenuListSixth = true;
    }
  }

  childMenuListSeventh = false;
  childSevenArr = [];
  sixthMenuListFunc(item) {
    console.log(item, "item");
    // console.log(this.parentArr, "this.parentArr");

    var parentThreeArr = [];
    if (item.children.length != 0) {
      _.forEach(item.children, function (value) {
        // console.log(value,"value");
        parentThreeArr.push(value);
      });
      console.log(parentThreeArr, "parentThreeArr 5555");
      this.childSevenArr = parentThreeArr;
      // this.childMenuListFirst = false;
      this.childMenuListSeventh = true;
    }
  }

  // parentArr = [];
  // parentMenuListFirst = false;
  // backMenuList(val) {
  //   console.log(val, "val");
  //   // // console.log(this.parentArr, "this.parentArr");
  //   // console.log(this.childMenuListFirst, "???????");
  //   // console.log(this.parentArr, "this.parentArr");
  //   // if (  this.childMenuListFirst == true) {
  //   //   console.log("ye got it 1");

  //   //   this.parentArr.push(this.menulist);
  //   //   this.childMenuListFirst = false;
  //   //   // this.childMenuListSecond = true;
  //   //  }
  //   // else if ( this.childMenuListSecond == true) {
  //   //   console.log("ye got it 2");
  //   //   // this.parentMenuListFirst = true;
  //   //   // this.childMenuListFirst = false;
  //   //   // this.parentArr.push(this.menulist);
  //   //   // console.log(this.parentArr,"this.parentArr");

  //   // } else {
  //   //   // this.parentArr.push(this.menulist);
  //   //   // this.childMenuListFirst = false;
  //   // }

  //   // console.log(_.chunk(['a', 'b', 'c', 'd'], 2), ">>>>>>>>>>>"); //lodash function
  // }


  //define the toogle property
  private togglemenuback: boolean = false;
  //define your method
  clickEvent(event) {
    //if you just want to toggle the class; change toggle variable.
    this.togglemenuback = !this.togglemenuback;
  }
  //////////////side menu//////////////////////////


  /////////tree menu/////////
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<TreeNode>;
  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, TreeNode>;
  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, TreeNode>;
  /////////tree menu/////////

  route: string;
  mainHeaderName: string;
  breadcrumbList = [];
  routeLinks: number;
  count: number;


  constructor(private _formBuilder: FormBuilder, private location: Location, private router: Router, private authenticationService: AuthenticationService, @Inject(DOCUMENT) private document: any, private overlayContainer: OverlayContainer) {
    router.events.subscribe((url: any) => console.log(url));
    console.log(router.url)
     /////////////breadcrums////////////////////

    //  this.urlPathPage = router.url;
    
    //  this.breadcrumbLinksList = this.urlPathPage.split('/').join("<i class='fa fa-chevron-right pl-1 pr-1'></i>")
    //  console.log(this.breadcrumbLinksList, "this.breadcrumbLinksList");


     ///

     router.events.subscribe((val) => {
      if (location.path() !== '') {
        this.route = location.path();
        this.route.split('%20').join(' ');
        let spaceAddURL=this.route.split('%20').join(' ')
        this.breadcrumbList = spaceAddURL.split('/');
        this.breadcrumbList = this.breadcrumbList.filter(function(entry) { return entry.trim() != ''; });
        console.log(this.breadcrumbList,"this.breadcrumbList");
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

     ///
 
     /////////////breadcrums////////////////////


    ///////////user authenticat/////////////
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    ///////////user authenticat/////////////

    ///////tree menu//////////
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

    this.treeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = files;
    ///////tree menu//////////


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


    // if (!this.searchHistory.some(q => q === this.stateCtrl.value)) {
    //   this.searchHistory = [...this.searchHistory, this.stateCtrl.value];
    // }
    //////////////search///////////////////


  }




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
    console.log(evt, "evt");

    if (evt.source.selected) {
      console.log("bahar");

      // this.addClassActiveSearch = false;
      // this.addClassActiveSearch =! this.addClassActiveSearch;
      // this.addClassActiveSearch = false;
      // alert("hello ");
    }
  }



  search(item) {
    console.log(item, "item");
    console.log(item._isOpen, "item._isOpen");
    this.addClassActiveSearch = !this.addClassActiveSearch;

    console.log(this.stateCtrl, "this.stateCtrl");
    console.log('Name:', this.stateCtrl.value);
    if (item._isOpen) {
      console.log("under");

    }

  }


  // searchHistory = [];
  // search() {
  //   console.log(this.stateCtrl,"this.stateCtrl");
  //   console.log('Name:' ,this.stateCtrl.value );

  //   // // do your search then store the result
  //   if (!this.searchHistory.some(q => q === this.stateCtrl.value)) {
  //     this.searchHistory = [...this.searchHistory, this.stateCtrl.value];
  //   }
  // }





  elem;

  ngOnInit() {
    this.elem = document.documentElement;
    this.onLoad();

  }


  preventCloseOnClickOut() {
    this.overlayContainer.getContainerElement().classList.add('disable-backdrop-click');
  }

  allowCloseOnClickOut() {
    this.overlayContainer.getContainerElement().classList.remove('disable-backdrop-click');
  }


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


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  ///////////////////////
  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      name: node.name,
      icon: node.icon,
      link: node.link,
      level: level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: TreeNode) {
    return node.level;
  }

  /** Return whether the node is expanded or not. */
  isExpandable(node: TreeNode) {
    return node.expandable;
  };

  /** Get the children for the node. */
  getChildren(node: FileNode) {
    return observableOf(node.children);
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: TreeNode) {
    return node.expandable;
  }
  /////////////////////


  toggle() {
    this.expanded = !this.expanded;
  }


  // increase() {
  //   this.sidenavWidth = 15;
  //   this.expanded = true;
  // }
  // decrease(sidenav) {
  //   this.sidenavWidth = 4;
  //   this.expanded = false;
  // }



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






}
