import { Directive, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[isEllipsisActive]'
})
export class isEllipsisActiveDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
      const element = this.elementRef.nativeElement;
      const length = this.elementRef.nativeElement.id.length;
      if (length > 12) {
        element.id = 'showTitle';
        element.style.width = length*5+'px';
      }
  }

}
