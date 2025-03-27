import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appSpiderView]'
})
export class SpiderViewDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.setFontColor('red')
  }

  setFontColor(color: string) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', color)
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setFontColor('blue')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setFontColor('red')
  }


}
