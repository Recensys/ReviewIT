/**
 * Created by jbec on 08/06/2016.
 */
"use strict";
var BooleanField = (function () {
    function BooleanField(data) {
        this.Type = 'boolean';
        this.Options = ["Yes", "No"];
        this.Name = data.Name;
        this.Input = data.Input;
        this.Trueval = data.Trueval;
        this.Falseval = data.Falseval;
    }
    Object.defineProperty(BooleanField.prototype, "debug", {
        get: function () { return JSON.stringify(this); },
        enumerable: true,
        configurable: true
    });
    BooleanField.prototype.getView = function () {
        return 'app/fields/boolean.field.html';
    };
    return BooleanField;
}());
exports.BooleanField = BooleanField;
