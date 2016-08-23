/**
 * Created by jbec on 08/06/2016.
 */
"use strict";
var RadioField = (function () {
    function RadioField(name, input, options) {
        this.Type = 'radio';
        this.Name = name;
        this.Input = input;
        this.Options = options;
    }
    RadioField.prototype.getView = function () { return 'app/fields/radio.field.html'; };
    Object.defineProperty(RadioField.prototype, "debug", {
        get: function () { return JSON.stringify(this); },
        enumerable: true,
        configurable: true
    });
    return RadioField;
}());
exports.RadioField = RadioField;
