import { Component,OnInit ,ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
// import faker from 'faker';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { fromEvent, Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-contextmenu-layer',
  templateUrl: './contextmenu-layer.component.html',
  styleUrls: ['./contextmenu-layer.component.scss']
})
export class ContextmenuLayerComponent implements OnInit {

  users = Array.from({ length: 10 }, () => ({
    // name: faker.name.findName()
    name: ""
  }));
  sub: Subscription;

  @ViewChild('userMenu') userMenu: TemplateRef<any>;

  overlayRef: OverlayRef | null;

  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef) {
  }

  open({ x, y }: MouseEvent, user) {
    this.close();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.userMenu, this.viewContainerRef, {
      $implicit: user
    }));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.close())

  }

  delete(user) {
    // delete user
    this.close();
  }

  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnInit(): void {
  }

}
