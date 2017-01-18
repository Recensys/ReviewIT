
import { ModuleWithProviders, NgModule }       from '@angular/core';
import { CommonModule }      from '@angular/common';

// 3rd party
import { RadioButtonModule } from 'primeng/primeng'
import { ButtonsModule } from 'ng2-bootstrap';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { FileUploadModule } from 'ng2-file-upload';

// fields
import { FieldDynComponent } from './field-dyn.component';
import { BooleanFieldComponent } from './fields/boolean-field.component';
import { StringFieldComponent } from './fields/string-field.component';
import { PdfFieldComponent, SafePipe } from './fields/pdf-field.component';
import { NumberFieldComponent } from './fields/number-field.component'


@NgModule({
    imports: [ CommonModule, ButtonsModule, RadioButtonModule, FileUploadModule ],
    declarations: [ FieldDynComponent, BooleanFieldComponent, StringFieldComponent, PdfFieldComponent, PdfViewerComponent, SafePipe, NumberFieldComponent  ],
    exports: [FieldDynComponent],
    providers: [ ],
    entryComponents: [ BooleanFieldComponent, StringFieldComponent, PdfFieldComponent, NumberFieldComponent ]
})
export class FieldDynModule {
}