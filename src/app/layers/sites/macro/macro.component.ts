import { Component, OnInit, Injectable } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
// import { files } from "./example-data";
import { BehaviorSubject, Observable, of as observableOf } from "rxjs";
import { Router } from "@angular/router";

import { first } from "rxjs/operators";

import { User } from "../../../_models/user";
import { UserService } from "../../../_services/user.service";

import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-macro',
  templateUrl: './macro.component.html',
  styleUrls: ['./macro.component.scss']
})
export class MacroComponent implements OnInit {

  loading = false;
  users: User[];

  userUsageList = [
    {
      name: "Total Users",
      unit: "50.91 mn",
      details: "User Today",
      color:
        "linear-gradient(0deg, rgba(101,23,206,1) 0%, rgba(63,78,233,1) 35%)"
    },
    {
      name: "Total Calls",
      unit: "487 mn",
      details: "Calls Today",
      color: "linear-gradient(0deg, rgba(138,3,20,1) 0%, rgba(203,27,48,1) 35%)"
    },
    {
      name: "Total Coverage",
      unit: "94.2 %",
      details: "Coverage Today",
      color: "linear-gradient(0deg, rgba(3,136,48,1) 0%, rgba(1,187,63,1) 35%)"
    },
    {
      name: "Jio Phone Handsets",
      unit: "50.87 mn",
      details: "Handset Today",
      color:
        "linear-gradient(0deg, rgba(149,10,145,1) 0%, rgba(237,5,127,1) 35%)"
    }
  ];
  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    console.log(this.router,"this.router.url");
    router.events.subscribe((url: any) => console.log(url));
    console.log(router.url, "router.url");
    /////////////////
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  currentUser: User;

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
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

}
