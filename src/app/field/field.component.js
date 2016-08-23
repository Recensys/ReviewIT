"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var common_2 = require('@angular/common');
var FieldComponent = (function () {
    function FieldComponent(componentResolver) {
        this.componentResolver = componentResolver;
    }
    FieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        var dynamicComponent = FieldComponent.createContentComponent(this.field, this.data);
        this.componentResolver.resolveComponent(dynamicComponent)
            .then(function (factory) { return _this.contentTarget.createComponent(factory); });
    };
    FieldComponent.createContentComponent = function (Field, Data) {
        var FieldContentComponent = (function () {
            function FieldContentComponent() {
                this.Data = Data;
                this.Field = Field;
            }
            FieldContentComponent = __decorate([
                core_1.Component({
                    selector: 'field-content',
                    templateUrl: Field.getView(),
                    directives: [common_2.CORE_DIRECTIVES, ng2_bootstrap_1.BUTTON_DIRECTIVES, common_1.NgModel]
                })
            ], FieldContentComponent);
            return FieldContentComponent;
        }());
        return FieldContentComponent;
    };
    __decorate([
        core_1.Input()
    ], FieldComponent.prototype, "field");
    __decorate([
        core_1.Input()
    ], FieldComponent.prototype, "data");
    __decorate([
        core_1.ViewChild('typedfield', { read: core_1.ViewContainerRef })
    ], FieldComponent.prototype, "contentTarget");
    FieldComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'field',
            template: '<div #typedfield></div>',
            styleUrls: ['field.component.css']
        })
    ], FieldComponent);
    return FieldComponent;
}());
exports.FieldComponent = FieldComponent;
