/**
 * Created by jbec on 08/06/2016.
 */
"use strict";
var CheckboxField = (function () {
    function CheckboxField(name, input, options) {
        this.Type = 'checkbox';
        this.Name = name;
        this.Input = input;
        this.Options = options;
    }
    CheckboxField.prototype.getView = function () {
        return 'app/fields/checkbox.field.html';
    };
    return CheckboxField;
}());
exports.CheckboxField = CheckboxField;
