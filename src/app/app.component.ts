import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit
} from "@angular/core";
import { VERSION } from "@angular/material";
import { NavItem } from "../app/sidebarmenu/nav-item";
// import { NavService } from "./nav.service";
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

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
   navItems: NavItem[] = [
     {
       displayName: "Home",
       iconName: "home",
       route: "portaljcp"
     },
     {
       displayName: "Layers",
       iconName: "recent_actors",
       route: "layer",
       children: [
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
         },
         {
           displayName: "Feedback",
           iconName: "feedback",
           route: "layer/feedback"
         }
       ]
     }
   ];
 
   constructor(private router: Router) {
     // console.log(this.wrapper,"this.wrapper>>>>>>");
     this.router.events.subscribe((event: Event) => {
       // console.log(event,"event");
       this.urlLinkOfMenu = router.url.toString()
      //  console.log('current route: ', router.url.toString());
       // if (event instanceof NavigationEnd) {
       //   this.currentUrl.next(event.urlAfterRedirects);
       //   console.log(this.currentUrl.next(event.urlAfterRedirects));
         
       // }
     });
   }
 
   // ngAfterViewInit() {
   //   this.navService.wrapper = this.wrapper;
   // }
 
   menulistExpandFunc() {
     this.collapsed = !this.collapsed;
     this.router.navigate([this.urlLinkOfMenu]);
     // $('a').find('.menu-list-item').removeClass("expanded");
    //  console.log($(this).find('.collapsed'));
     
     // if ($(this).find('.collapsed')) {
     //   $(this).addClass("collapsed");
     
     // } else {
      
     // }
     
 
   }
}
