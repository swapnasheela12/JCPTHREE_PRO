import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public collapsed: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {
    console.log(this.router,"this.router>>>>service");
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    // this.wrapper.close();
    this.collapsed= false;
  }

  public openNav() {
    // this.wrapper.open();
    this.collapsed = true;
  }
}
