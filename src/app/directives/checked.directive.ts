import {ElementRef, Input, Directive} from "@angular/core";
/**
 * Created by jbec on 08/06/2016.
 */

@Directive({
  selector: '[ngChecked]'
})

export class CheckedDirective {
  @Input('ngChecked') set setDisabled(state:boolean){
    this.el.nativeElement.checked = state;
  }

  constructor(private el: ElementRef) {}
}
