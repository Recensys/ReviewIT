import {
    ModuleWithProviders, NgModule }       from '@angular/core';
import { CommonModule }      from '@angular/common';

import {FieldDynComponent} from './field-dyn.component';
import {BooleanFieldComponent} from './fields/boolean-field.component'

@NgModule({
    imports: [CommonModule],
    declarations: [FieldDynComponent, BooleanFieldComponent],
    exports: [FieldDynComponent],
    providers: [],
    entryComponents: [BooleanFieldComponent]
})
export class FieldDynModule {
}