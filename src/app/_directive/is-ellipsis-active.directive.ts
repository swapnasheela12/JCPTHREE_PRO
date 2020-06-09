import { Directive, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[isEllipsisActive]'
})
export class isEllipsisActiveDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
      const element = this.elementRef.nativeElement;
      if((230 - element.offsetWidth) < 75){
        element.id = 'showTitle';
        element.style.width = (element.offsetWidth - 60)+'px';
      }
  }

}
