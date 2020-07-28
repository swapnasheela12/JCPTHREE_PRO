import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: "app-login-jcp-three",
  templateUrl: "./login-jcp-three.component.html",
  styleUrls: ["./login-jcp-three.component.scss"]
})
export class LoginJcpThreeComponent implements OnInit {
  checked = false;
  indeterminate = false;
  labelPosition: "before" | "after" = "after";
  disabled = false;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/JCP/Home"]);
    }
  }

  ngOnInit() {


    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });



    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/JCP/Home";
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {

    console.log(this.router.url, "this.router.url");
    console.log(this.loginForm, " this.loginForm");
    console.log(this.route, "route");
    console.log(this.returnUrl, "this.returnUrl");
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.router.navigate([this.returnUrl]);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
