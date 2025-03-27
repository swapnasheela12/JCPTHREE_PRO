import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit
} from "@angular/core";
import { VERSION } from "@angular/material/core";
// import { NavService } from "./nav.service";
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

import { latLng, tileLayer } from 'leaflet';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'jcpThree';
   // @ViewChild("wrapper", { static: false }) wrapper: ElementRef;

   public currentUrl = new BehaviorSubject<string>(undefined);

   ngOnInit() {}
 
   version = VERSION;
   public collapsed : any;
   public urlLinkOfMenu : any;
 
   constructor(private router: Router) {
     this.router.events.subscribe((event: Event) => {
       this.urlLinkOfMenu = router.url.toString()
     });
   }
 
   menulistExpandFunc() {
     this.collapsed = !this.collapsed;
     this.router.navigate([this.urlLinkOfMenu]); 
   }
}
