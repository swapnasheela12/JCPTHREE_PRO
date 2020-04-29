
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


 

  //////////side menu/////////////////////
  sidenavWidth = 4;
  ngStyle: string;
  expanded: boolean;

  // noderadiobutt : boolean;
  public chosenItem: boolean;
  public isCollapsed = false;
  private userName: string = "";
  private userActiveRole: string = "";

  

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

  


  constructor(private _formBuilder: FormBuilder, private location: Location, private router: Router, private authenticationService: AuthenticationService, @Inject(DOCUMENT) private document: any, private overlayContainer: OverlayContainer) {
    router.events.subscribe((url: any) => console.log(url));
    console.log(router.url)
    


   

    ///////tree menu//////////
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

    this.treeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = files;
    ///////tree menu//////////


   


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





  

  ngOnInit() {
  
  }


  // preventCloseOnClickOut() {
  //   this.overlayContainer.getContainerElement().classList.add('disable-backdrop-click');
  // }

  // allowCloseOnClickOut() {
  //   this.overlayContainer.getContainerElement().classList.remove('disable-backdrop-click');
  // }


 


 
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
  
  
  toggle() {
    this.expanded = !this.expanded;
  }
  
  
  /////////////////////




  // increase() {
  //   this.sidenavWidth = 15;
  //   this.expanded = true;
  // }
  // decrease(sidenav) {
  //   this.sidenavWidth = 4;
  //   this.expanded = false;
  // }



 


  





}
