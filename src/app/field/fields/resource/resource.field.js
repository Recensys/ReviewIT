/**
 * Created by jbec on 08/06/2016.
 */
"use strict";
var ResourceField = (function () {
    function ResourceField(name, input) {
        this.Type = 'resource';
        this.Name = name;
        this.Input = input;
    }
    ResourceField.prototype.getView = function () {
        return 'app/fields/resource.field.html';
    };
    return ResourceField;
}());
exports.ResourceField = ResourceField;
