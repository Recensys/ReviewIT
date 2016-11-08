import {
    ModuleWithProviders, NgModule }       from '@angular/core';
import { CommonModule }      from '@angular/common';

import {FieldDynComponent} from './field-dyn.component';
import {BooleanFieldComponent} from './fields/boolean-field.component';
import {StringFieldComponent} from './fields/string-field.component';
import { ButtonsModule } from 'ng2-bootstrap';
import { RadioButtonModule } from 'primeng/primeng'

@NgModule({
    imports: [CommonModule, ButtonsModule, RadioButtonModule ],
    declarations: [FieldDynComponent, BooleanFieldComponent, StringFieldComponent],
    exports: [FieldDynComponent],
    providers: [ ],
    entryComponents: [ BooleanFieldComponent, StringFieldComponent ]
})
export class FieldDynModule {
}