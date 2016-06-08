/**
 * Created by jbec on 08/06/2016.
 */

import { Component, Input, ViewContainerRef, ComponentResolver, ViewChild, OnInit} from "@angular/core";
import { Data } from "./model/field.model";

@Component({
  selector: 'field',
  template: '<div #typedfield></div>'
})

export class FieldComponent implements OnInit {

  @Input() private data: Data;

  @ViewChild('typedfield', { read: ViewContainerRef })
  protected contentTarget: ViewContainerRef;

  constructor(private componentResolver: ComponentResolver) {}

  ngOnInit() {
    var dynamicComponent = this.createContentComponent(this.data);
    this.componentResolver.resolveComponent(dynamicComponent)
      .then((factory: any) => this.contentTarget.createComponent(factory));
  }

  createContentComponent(inputData: Data) {

    @Component({
      selector: 'field-content',
      templateUrl: inputData.field.getView()
    })

    class FieldContentComponent {
      data: Data = inputData;
    }

    return FieldContentComponent ;
    
  }
}
