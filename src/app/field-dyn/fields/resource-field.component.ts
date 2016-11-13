
import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

import { FieldDTO, DataType, DataDTO } from '../../model/models'

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@Component({
    selector: 'resource-field',
    template: `
    <div *ngIf="requested">
        <h1>upload PDF...</h1>
    </div>
    <div *ngIf="!requested">
        <object [data]="data.Value | safe" type="application/pdf">
            <p>It appears you don't have a PDF plugin for this browser.</p>
        </object>
    </div>
    `
})
export class ResourceFieldComponent {

    @Input() data: DataDTO;
    @Input() field: ResourceField;
    @Input() requested: Boolean;

    constructor() { }

}

export class ResourceField implements FieldDTO{
	Id: number;
    Name: string;
	DataType: DataType = DataType.Resource;
}