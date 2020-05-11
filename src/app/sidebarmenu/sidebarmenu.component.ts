import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit
} from "@angular/core";
import { VERSION } from "@angular/material/core";
import { NavItem } from "./nav-item";
import { NavService } from "./nav.service";
import { Event, NavigationEnd, Router } from "@angular/router";

import { BehaviorSubject, Observable, of as observableOf, from } from "rxjs";

import { first } from "rxjs/operators";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";

import { AuthenticationService } from "../_services/authentication.service";
// import{menuListData} from "./menulist-data";

declare var $: any;

// export interface NavItem {
//   displayName: string;
//   disabled?: boolean;
//   iconName: string;
//   route?: string;
//   children?: NavItem[];
// }

@Component({
  selector: "app-sidebarmenu",
  templateUrl: "./sidebarmenu.component.html",
  styleUrls: ["./sidebarmenu.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SidebarmenuComponent implements OnInit {
  // @ViewChild("wrapper", { static: false }) wrapper: ElementRef;

  public currentUrl = new BehaviorSubject<string>(undefined);

  version = VERSION;
  public collapsed: any;
  public urlLinkOfMenu: any;
  // NavItem : NavItem[] = menuListData;
  navItems: NavItem[] = [
    {
      displayName: "Home",
      iconName: "fas fa-home",
      route: "portaljcp"
    },
    {
      displayName: "Layers",
      iconName: "fas fa-layer-group",
      route: "layer",
      children: [
        {
          displayName: "Analytics",
          iconName: "",
          route: "layer/analytics",
          children: [
            {
              displayName: "Subscriber",
              iconName: "",
              route: "layer/analytics/subscriber",
              children: [
                {
                  displayName: "Anomalies",
                  iconName: "",
                  route: "layer/analytics/subscriber/anomalies"
                },
                {
                  displayName: "Coverage",
                  iconName: "",
                  route: "layer/analytics/subscriber/coverage"
                },
                {
                  displayName: "Quality & Experience",
                  iconName: "",
                  route: "layer/analytics/subscriber/quality&experience"
                }
              ]
            },
            {
              displayName: "Network",
              iconName: "",
              route: "layer/analytics/network",
              children: [
                {
                  displayName: "Quality & Experience",
                  iconName: "",
                  route: "layer/analytics/network/quality&experience",
                  children: [
                    {
                      displayName: "Infill Planning",
                      iconName: "",
                      route:
                        "layer/analytics/network/quality&experience/infillplanning"
                    }
                  ]
                },
                {
                  displayName: "Anomalies",
                  iconName: "",
                  route: "layer/analytics/network/anomalies",
                  children: [
                    {
                      displayName: "Mis-aligned Sectors",
                      iconName: "",
                      route:
                        "layer/analytics/network/anomalies/misalignedsectors"
                    },
                    {
                      displayName: "Overshooting Cells",
                      iconName: "",
                      route:
                        "layer/analytics/network/anomalies/overshootingcells"
                    }
                  ]
                },
                {
                  displayName: "Coverage",
                  iconName: "",
                  route: "layer/analytics/network/coverage"
                }
              ]
            }
          ]
        },
        {
          displayName: "Sites",
          iconName: "group",
          route: "layer/sites",
          children: [
            {
              displayName: "Macro",
              iconName: "person",
              route: "layer/sites/macro"
            },
            {
              displayName: "Nominal",
              iconName: "person",
              route: "layer/sites/nominal"
            },
            {
              displayName: "On-Air",
              iconName: "person",
              route: "layer/sites/onair"
            }
          ]
        }
      ]
    },
    {
      displayName: "Dashboards",
      iconName: "fas fa-home",
      route: "dashboards"
    },
    {
      displayName: "Report",
      iconName: "fa fa-file-alt",
      route: "Report"
    }
  ];

  constructor(
    private navService: NavService,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    // console.log(this.router, "this.router.url");
    router.events.subscribe((url: any) => console.log());
    // console.log(router.url, "router.url");
    /////////////////
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
    /////////////////////////

    this.router.events.subscribe((event: Event) => {
      this.urlLinkOfMenu = router.url.toString();
      // console.log("current route: ", router.url.toString());
    });
  }

  loading = false;
  users: User[];
  currentUser: User;

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }

  ngOnInit() {
    this.loading = true;
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.loading = false;
        this.users = users;
      });
  }

  menulistExpandFunc() {
    this.collapsed = !this.collapsed;
    this.router.navigate([this.urlLinkOfMenu]);
    // if ($("#sidebar").hasClass("collapsed")) {
    //   console.log($(".mat-list-item").hasClass('expanded'),">>>>>>>");

    //   // this.expanded = false;
    // } else {
    //   // this.expanded = true;
    //   // this.expanded = !this.expanded;
    // }
    if ($(this).hasClass("expanded")) {
      console.log(this.collapsed, "this.collapsed");
      console.log(
        $(this).hasClass("expanded"),
        "thi$(this).hasClass.collapsed"
      );
    }
  }
}
