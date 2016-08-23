"use strict";
(function (TaskState) {
    TaskState[TaskState["New"] = 0] = "New";
    TaskState[TaskState["InProgress"] = 1] = "InProgress";
    TaskState[TaskState["Submitted"] = 2] = "Submitted";
})(exports.TaskState || (exports.TaskState = {}));
var TaskState = exports.TaskState;
var Task = (function () {
    function Task(data) {
        this.Id = data.Id,
            this.State = data.TaskState,
            this.Data = data.Data;
    }
    return Task;
}());
exports.Task = Task;
