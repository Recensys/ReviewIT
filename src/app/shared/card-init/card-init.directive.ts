


import { Directive, TemplateRef, ViewContainerRef, Input, ElementRef, Renderer } from '@angular/core';
import { Observable } from 'rxjs'

@Directive({
  selector: '[cardInit]'
})
export class CardInitDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer
  ) { }

  @Input('cardInit')
  set delayTime(loading: Observable<any>) {

    // build additional templating for loader
    this.viewContainerRef.createEmbeddedView(this.templateRef);
    var card = this.templateRef.elementRef.nativeElement.nextSibling;
    var lelement = this.renderer.createElement(card, 'md-card-loading-overlay');
    var lanimation = this.renderer.createElement(card, 'md-card-loading-animation');
    this.renderer.setElementClass(lanimation, 'fa', true);
    this.renderer.setElementClass(lanimation, 'fa-spinner', true);
    this.renderer.setElementClass(lanimation, 'fa-pulse', true);
    this.renderer.setElementClass(lanimation, 'fa-3x', true);
    this.renderer.setElementClass(lanimation, 'fa-fw', true);

    // handle data completion
    loading.subscribe(
      () => { },
      error => {
        this.renderer.setElementClass(lanimation, 'hidden', true);
        var errormsg = this.renderer.createElement(lelement, 'h3');
        this.renderer.setText(errormsg, error);
      },
      () => {
        this.renderer.setElementClass(lanimation, 'hidden', true);
        this.renderer.setElementClass(lelement, 'hidden', true);
      }
    )
  }
}