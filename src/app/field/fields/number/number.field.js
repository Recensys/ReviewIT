/**
 * Created by jbec on 08/06/2016.
 */
"use strict";
var NumberField = (function () {
    function NumberField(data) {
        this.Type = 'number';
        this.Name = data.Name;
        this.Input = data.Input;
        console.log("numberField created with name: " + this.Name);
    }
    NumberField.prototype.getView = function () {
        return 'app/fields/number.field.html';
    };
    return NumberField;
}());
exports.NumberField = NumberField;
