/**
 * Created by jbec on 08/06/2016.
 */
"use strict";
var StringField = (function () {
    function StringField(data) {
        this.Type = 'string';
        this.Name = data.Name;
        this.Input = data.Input;
    }
    StringField.prototype.getView = function () {
        return 'app/fields/string.field.html';
    };
    return StringField;
}());
exports.StringField = StringField;
