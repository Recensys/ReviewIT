import {Directive, Input, ElementRef} from "@angular/core";
/**
 * Created by jbec on 08/06/2016.
 */

@Directive({
  selector: '[ngDisabled]'
})

export class DisabledDirective {
  @Input('ngDisabled') set setDisabled(state:boolean){
    this.el.nativeElement.disabled = state;
  }

  constructor(private el: ElementRef) {}
}
