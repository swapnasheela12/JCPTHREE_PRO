import { Directive, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[isEllipsisActive]'
})
export class isEllipsisActiveDirective implements AfterViewInit {
  @Input('isEllipsisActive') name :string;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
      const element = this.elementRef.nativeElement;
      const length = this.elementRef.nativeElement.id.length;
      if (this.name == 'leftside-navigation') {
        if (length > 12) {
          element.id = 'showTitle';
          element.style.width = length*5+'px';
          element.style.textOverflow = 'ellipsis';
        }
      } else if (this.name == 'custom') {
        if (length > 150) {
          element.id = 'showTitle';
          element.style.width = length*5+'px';
          element.style.textOverflow = 'ellipsis';
        }
      } else if (this.name == 'customUser'){
        if (length > 5) {
          element.id = 'customUser';
          element.style.width = length*2.5+'px';
          element.style.float = 'left';
          element.style.textOverflow = 'ellipsis';
        }
      } else if (this.name == 'customModifiedUser') {
        if (length > 5) {
          element.id = 'customUser';
          element.style.width = length*4+'px';
          element.style.float = 'left';
          element.style.textOverflow = 'ellipsis';
        }
      } else if (this.name == 'planningTarget') {
        if (length > 35) {
          element.id = 'customUser';
          element.style.width = "100%";
          element.style.textOverflow = 'ellipsis';
        }
      } else if (this.name == 'planningTarget2') {
        if (length > 25) {
          element.id = 'customUser';
          element.style.width = "100%";
          element.style.textOverflow = 'ellipsis';
        }
      } else if (this.name == 'existingArea') {
        if (length > 40) {
          element.id = 'customUser';
          element.style.width = "100%";
          element.style.textOverflow = 'ellipsis';
        }
      }
  }

}
