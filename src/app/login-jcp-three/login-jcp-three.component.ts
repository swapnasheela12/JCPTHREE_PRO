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
  public checked: boolean = false;
  public indeterminate: boolean = false;
  public labelPosition: "before" | "after" = "after";
  public disabled: boolean = false;
  public loginForm: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  public returnUrl: string;
  public error: string = "";

  get f() { return this.loginForm.controls; }

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
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/JCP/Home";
  }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
