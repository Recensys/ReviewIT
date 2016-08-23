"use strict";
var StageModel = (function () {
    function StageModel(Id, Name, Description, Fields, Tasks) {
        this.Id = Id;
        this.Name = Name;
        this.Description = Description;
        this.Fields = Fields;
        this.Tasks = Tasks;
    }
    return StageModel;
}());
exports.StageModel = StageModel;
