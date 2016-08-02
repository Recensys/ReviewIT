import { Component, Input, ViewContainerRef, ComponentResolver, ViewChild, OnInit} from "@angular/core";
import { NgClass, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, NgModel } from "@angular/common";

import { Data } from "../model/data";
import { Field } from "./fields";
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { CORE_DIRECTIVES } from '@angular/common';
import { ButtonRadioDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'field',
  template: '<div #typedfield></div>',
  styleUrls: ['field.component.css']
})

export class FieldComponent implements OnInit {

  @Input() private field: Field;
  @Input() private data: Data;

  @ViewChild('typedfield', { read: ViewContainerRef })
  protected contentTarget: ViewContainerRef;

  constructor(private componentResolver: ComponentResolver) {}

  ngOnInit() {
    var dynamicComponent = FieldComponent.createContentComponent(this.field, this.data);
    this.componentResolver.resolveComponent(dynamicComponent)
      .then((factory: any) => this.contentTarget.createComponent(factory));
  }

  static createContentComponent(Field: Field, Data: Data) {

    @Component({
      selector: 'field-content',
      templateUrl: Field.getView(),
      directives: [ CORE_DIRECTIVES, BUTTON_DIRECTIVES, NgModel]
    })

    class FieldContentComponent {
      Data: Data = Data;
      Field: Field = Field;
    }

    return FieldContentComponent ;

  }
}

