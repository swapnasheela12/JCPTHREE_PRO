import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { CommentHighlightFieldComponent } from './comment-highlight-field.component';

@Directive({
  selector: '[appCommentHighlightField]'
})
export class CommentHighlightFieldDirective implements OnInit, OnChanges {
  ishover: boolean = false;
  div;
  element;
  comment;
  @Input('value') value:string;
  constructor(private dataShare: DataSharingService ,private el : ElementRef, private renderer: Renderer2,private cfr: ComponentFactoryResolver, private vcr: ViewContainerRef) { }

  ngOnInit() {
    this.dataShare.currentMessage.subscribe((data: any) => {
      if(data.perform === "remove-selection") {
        this.dehighlight(data.element);
        this.vcr.clear();
      } 
    })

    this.dataShare.addComment.subscribe((d: any) => {
      if(d.message) {
        this.comment = d.message;
        //console.log("comment is listened in cmmon high comp")
        this.ishover =  true;
        this.element = d.element;
       this.dehighlight(d.element);
      } 
      //this.dataShare.changeMessage({"comment": d.message});
    })

  }

  // ngOnChanges() {
  //   // this.dataShare.currentMessage.subscribe((data) => {
  //   //   if(data === "remove-selection") {
  //   //     this.dehighlight();
  //   //   }

  //   // })
  // }

  @HostListener('change') ngOnChanges() {
    console.log('test');
  }

  @HostListener('mouseover') onMouseOver() {
    if(this.ishover) {
      this.hoverShowComment();
    } 
  }

  @HostListener('mouseout') onMouseOut() {
    if(this.ishover) {
      this.hoverRemoveComment();
    } 
  }

  @HostListener('click') onClick() {
    this.highlight();
    console.log("com jsom", this.value)
    // if(this.div) {
    //   this.hoverRemoveComment();
    // }
     
  }
  
  async highlight() {
    this.el.nativeElement.style.border = "1.5px solid red";
   // this.el.nativeElement.style.padding = "5px";
    // var c =this.cfr.resolveComponentFactory(CommentHighlightFieldComponent);
    // this.el.nativeElement.createComponent(c);
    const { CommentHighlightFieldComponent } = await import('./comment-highlight-field.component');
    this.vcr.createComponent(
      this.cfr.resolveComponentFactory(CommentHighlightFieldComponent))
     //this.dataShare.element({"element": this.el, "formdata": this.value})
     console.log("el", this.el)
  }

  dehighlight(element) {
   // console.log(" this.el.nativeElement",this.el.nativeElement);
    element.nativeElement.style.border = "none";
  }

  hoverShowComment() {
    console.log(" this.el.nativeElement",this.el.nativeElement);
    console.log(" element",this.element.nativeElement);
    //this.renderer.setElementAttribute(elementRef.nativeElement, 'attributename', 'attributevalue');
    this.div = this.renderer.createElement('div');
  const text = this.renderer.createText(this.comment);

  this.renderer.appendChild(this.div, text);
  if(this.el.nativeElement === this.element.nativeElement) {
    this.renderer.appendChild(this.element.nativeElement, this.div);
    this.renderer.addClass(this.div, "added-comment")
  }

  }

  hoverRemoveComment() {
    if(this.el.nativeElement === this.element.nativeElement) {
    this.renderer.removeChild(this.element.nativeElement, this.div)
    }
  }


}
