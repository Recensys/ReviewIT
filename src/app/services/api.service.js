"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var Globals = require('../shared/globals');
var stageModel_1 = require('../model/stageModel');
var field_1 = require('../field');
var task_1 = require('../model/task');
var APIService = (function () {
    function APIService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
    }
    /***
     * USER METHODS
     */
    APIService.prototype.ValidateUser = function (username, password) {
        var body = JSON.stringify({ 'Username': username, 'Password': password });
        return this.http.post(Globals.api + 'login', body, this.AuthOptions())
            .map(this.extractJson)
            .catch(this.handleError);
    };
    APIService.prototype.CreateUser = function (username, password) {
        var body = JSON.stringify({ 'Username': username, 'Password': password });
        var url = Globals.api + 'user/create';
        return this.http.post(url, body, this.AuthOptions())
            .map(this.extractJson)
            .catch(this.handleError);
    };
    /***
     * TASK METHODS
     */
    APIService.prototype.GetTask = function (id) {
        var url = Globals.api + 'task/' + id;
        return this.http.get(url, { withCredentials: true })
            .map(this.exstractStageModel.bind(this))
            .catch(this.handleError);
    };
    APIService.prototype.GetStages = function (studyId) {
        var url = Globals.api + 'stage';
        return this.http.get(url, { withCredentials: true })
            .map(this.exstractStageModels.bind(this))
            .catch(this.handleError);
    };
    /***
     * FIELD METHODS
     */
    APIService.prototype.GetFields = function (studyId) {
        var url = Globals.api + "study/" + studyId + "/field";
        return this.http.get(url, { withCredentials: true })
            .map(this.extractJson)
            .catch(this.handleError);
    };
    /***
     * STAGE METHODS
     */
    APIService.prototype.SaveDatefields = function (stageId, visible, requested) {
        var body = JSON.stringify({ 'Visible': visible, 'Requested': requested });
        var url = Globals.api + "stage/" + stageId + "/datafields";
        var args = new http_1.RequestOptions();
        args.withCredentials = true;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        args.headers = headers;
        return this.http.post(url, body, args)
            .map(this.exstractStatusText)
            .catch(this.handleError);
    };
    APIService.prototype.SaveStageDetails = function (stageId, name, description) {
        var body = JSON.stringify({ 'Name': name, 'Description': description });
        var url = Globals.api + "stage/" + stageId + "/details";
        var args = new http_1.RequestOptions();
        args.withCredentials = true;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        args.headers = headers;
        return this.http.post(url, body, args)
            .map(this.exstractStatusText)
            .catch(this.handleError);
    };
    /***
     * STUDY METHODS
     */
    APIService.prototype.startStudy = function (id) {
        var url = Globals.api + "study/" + id + "/start";
        var args = new http_1.RequestOptions();
        args.withCredentials = true;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        args.headers = headers;
        return this.http.post(url, {}, args)
            .map(this.extractJson)
            .catch(this.handleError);
    };
    APIService.prototype.newStudy = function () {
        var url = Globals.api + "study/new";
        var args = new http_1.RequestOptions();
        args.withCredentials = true;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        args.headers = headers;
        return this.http.get(url, args)
            .map(this.extractJson)
            .catch(this.handleError);
    };
    APIService.prototype.deleteStudy = function (id) {
        var url = Globals.api + "study/" + id;
        var args = new http_1.RequestOptions();
        args.withCredentials = true;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        args.headers = headers;
        return this.http.delete(url, args)
            .map(this.exstractStatusText)
            .catch(this.handleError);
    };
    APIService.prototype.getStudies = function () {
        var url = Globals.api + "study/";
        var args = new http_1.RequestOptions();
        args.withCredentials = true;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        args.headers = headers;
        return this.http.get(url, args)
            .map(this.extractJson)
            .catch(this.handleError);
    };
    APIService.prototype.saveStudyDetails = function (id, studydetails) {
        var body = JSON.stringify({ 'Id': id, 'StudyDetails': studydetails });
        console.log(body);
        var url = Globals.api + "study/" + id;
        var args = new http_1.RequestOptions();
        args.withCredentials = true;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        args.headers = headers;
        return this.http.put(url, body, args)
            .map(this.exstractStatusText)
            .catch(this.handleError);
    };
    /***
     * HELPER METHODS
    */
    APIService.prototype.AuthOptions = function () {
        var token = this._cookieService.get('token');
        var args = new http_1.RequestOptions();
        args.withCredentials = true;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        args.headers = headers;
        return args;
    };
    APIService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    APIService.prototype.extractJson = function (res) {
        return res.json();
    };
    APIService.prototype.exstractStatusText = function (res) {
        return res.statusText;
    };
    APIService.prototype.buildStageModel = function (json) {
        var fields = [];
        var tasks = [];
        json['Fields'].forEach(function (element) {
            var field = InstanceLoader.getFieldInstance(element.DataType, element);
            fields.push(field);
        });
        json['Tasks'].forEach(function (element) {
            tasks.push(new task_1.Task(element));
        });
        return new stageModel_1.StageModel(+json.Id, json.Name, json.Description, fields, tasks);
    };
    APIService.prototype.exstractStageModel = function (res) {
        return this.buildStageModel(res.json());
    };
    APIService.prototype.exstractStageModels = function (res) {
        var _this = this;
        var json = res.json();
        var models = [];
        json.forEach(function (element) {
            models.push(_this.buildStageModel(element));
        });
        console.log(models);
        return models;
    };
    APIService = __decorate([
        core_1.Injectable()
    ], APIService);
    return APIService;
}());
exports.APIService = APIService;
var InstanceLoader = (function () {
    function InstanceLoader() {
    }
    InstanceLoader.getFieldInstance = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var instance = Object.create(this.map[name].prototype);
        instance.constructor.apply(instance, args);
        return instance;
    };
    InstanceLoader.map = {
        '0': field_1.StringField,
        '1': field_1.BooleanField,
        '2': field_1.RadioField,
        '3': field_1.CheckboxField,
        '4': field_1.NumberField,
        '5': field_1.ResourceField
    };
    return InstanceLoader;
}());
