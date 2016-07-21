/**
 * Created by jbec on 08/06/2016.
 */

import { Component, Input, ViewContainerRef, ComponentResolver, ViewChild, OnInit} from "@angular/core";
import { Data } from "./model/data";
import { Field } from "./model/field";
import {NgClass, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, NgModel} from "@angular/common";
import {CheckedDirective} from "./directives/checked.directive";
import {DisabledDirective} from "./directives/disabled.directive";
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {CORE_DIRECTIVES} from '@angular/common';
import { ButtonRadioDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'field',
  template: '<div #typedfield></div>'
})

export class FieldComponent implements OnInit {

  @Input() private data: [Field, Data];

  @ViewChild('typedfield', { read: ViewContainerRef })
  protected contentTarget: ViewContainerRef;

  constructor(private componentResolver: ComponentResolver) {}

  ngOnInit() {
    var dynamicComponent = FieldComponent.createContentComponent(this.data);
    this.componentResolver.resolveComponent(dynamicComponent)
      .then((factory: any) => this.contentTarget.createComponent(factory));
  }

  static createContentComponent(inputData: [Field, Data]) {

    @Component({
      selector: 'field-content',
      templateUrl: inputData['field'].getView(),
      directives: [ CORE_DIRECTIVES, DisabledDirective, CheckedDirective, BUTTON_DIRECTIVES, NgModel]
    })

    class FieldContentComponent {
      Data: Data = inputData['data'];
      Field: Field = inputData['field'];
    }

    return FieldContentComponent ;

  }
}
