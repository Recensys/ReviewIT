"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var ReviewStrategyComponent = (function () {
    function ReviewStrategyComponent(_api) {
        this._api = _api;
        this.model2 = 'mooooodel2';
        this.presets = [
            { Id: 0, Name: 'Equal Distribution' },
            { Id: 1, Name: 'Full Overlap' }
        ];
        this.researchers = [
            { Id: 0, Name: 'Mathias', Range: [0, 30] },
            { Id: 1, Name: 'Jacob', Range: [30, 100] }
        ];
        this.rangeValues = [0, 10];
        this.onRangeChange();
    }
    ReviewStrategyComponent.prototype.onRangeChange = function () {
        var c = [];
        for (var _i = 0, _a = this.researchers; _i < _a.length; _i++) {
            var researcher = _a[_i];
            var min = researcher.Range[0];
            var max = researcher.Range[1];
            for (var i = min; i < max; i++) {
                c[i] = true;
            }
        }
        var count = 0;
        for (var i = min; i < c.length; i++) {
            if (c[i])
                count++;
        }
        this.rangeValues = [0, count];
    };
    ReviewStrategyComponent.prototype.setPreset = function (preset) {
        switch (preset.Id) {
            case 0:
                this.setEqualDivision();
                break;
            case 1:
                this.setOverlapDivision();
                break;
            default:
                break;
        }
    };
    ReviewStrategyComponent.prototype.setEqualDivision = function () {
        var count = this.researchers.length;
        var division = 100 / count;
        var start = 0;
        this.researchers.forEach(function (element) {
            element.start = start;
            element.end = start + division;
            start = element.end;
        });
    };
    ReviewStrategyComponent.prototype.setOverlapDivision = function () {
        this.researchers.forEach(function (element) {
            element.start = 0;
            element.end = 100;
        });
    };
    ReviewStrategyComponent.prototype.updateRange = function (event) {
        var researcher = this.researchers.filter(function (e) { return e.Id === event.id; })[0];
        researcher.start = event.startValue;
        researcher.end = event.endValue;
        console.log(this.researchers);
    };
    ReviewStrategyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-review-strategy',
            templateUrl: 'review-strategy.component.html',
            styleUrls: ['review-strategy.component.css'],
            providers: [],
            directives: [common_1.COMMON_DIRECTIVES]
        })
    ], ReviewStrategyComponent);
    return ReviewStrategyComponent;
}());
exports.ReviewStrategyComponent = ReviewStrategyComponent;
