
import { ModuleWithProviders, NgModule }       from '@angular/core';
import { CommonModule }      from '@angular/common';

// 3rd party
import { RadioButtonModule } from 'primeng/primeng'
import { ButtonsModule } from 'ng2-bootstrap';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

// fields
import { FieldDynComponent } from './field-dyn.component';
import { BooleanFieldComponent } from './fields/boolean-field.component';
import { StringFieldComponent } from './fields/string-field.component';
import { ResourceFieldComponent, SafePipe } from './fields/resource-field.component';


@NgModule({
    imports: [ CommonModule, ButtonsModule, RadioButtonModule ],
    declarations: [ FieldDynComponent, BooleanFieldComponent, StringFieldComponent, ResourceFieldComponent, PdfViewerComponent, SafePipe ],
    exports: [FieldDynComponent],
    providers: [ ],
    entryComponents: [ BooleanFieldComponent, StringFieldComponent, ResourceFieldComponent ]
})
export class FieldDynModule {
}