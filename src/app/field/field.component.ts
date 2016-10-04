import { Component, Input, ViewContainerRef, /*ComponentResolver,*/ ViewChild, OnInit, NgZone} from "@angular/core";
import { NgClass } from "@angular/common";

import { Data } from "../model/data";
import { Field } from "./fields";

@Component({
  
  selector: 'field',
  template: '<div #typedfield></div>',
  styleUrls: ['field.component.css']
})

export class FieldComponent implements OnInit {

  @Input() private field: Field;
  @Input() private data: Data;

  @ViewChild('typedfield', { read: ViewContainerRef })
  protected contentTarget: ViewContainerRef;

  constructor(/*private componentResolver: ComponentResolver*/ private zone: NgZone) {}

  ngOnInit() {
    var dynamicComponent = FieldComponent.createContentComponent(this.field, this.data);
    //this.componentResolver.resolveComponent(dynamicComponent)
    //  .then((factory: any) => this.contentTarget.createComponent(factory));
  }

  static createContentComponent(Field: Field, Data: Data) {

    @Component({
      selector: 'field-content',
      templateUrl: Field.getView(),
    })

    class FieldContentComponent {
      Data: Data = Data;
      Field: Field = Field;
    }

    return FieldContentComponent ;

  }
}

