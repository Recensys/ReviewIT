


import { Directive, ElementRef, Input, Renderer } from '@angular/core';


@Directive({ 
    selector: '[cardInit]' 
})
export class CardInitDirective {

    constructor(el: ElementRef, renderer: Renderer) {
    }

    @Input() set cardInit(condition: boolean) {
    if (condition) {
      console.log('loading');
    } else {
      console.log('not loading');
    }
  }
}