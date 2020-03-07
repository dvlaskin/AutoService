var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var HttpRequestService = /** @class */ (function () {
    function HttpRequestService(http) {
        this.http = http;
        this.url = "/api/";
    }
    HttpRequestService.prototype.getRequest = function (apiController) {
        return this.http.get(this.url + apiController);
    };
    HttpRequestService.prototype.getRequestParams = function (apiController, getString) {
        return this.http.get(this.url + apiController + '/' + getString);
    };
    HttpRequestService.prototype.postRequest = function (apiController, postObject) {
        return this.http.post(this.url + apiController, postObject);
    };
    HttpRequestService.prototype.putRequest = function (apiController, putId, putObject) {
        return this.http.put(this.url + apiController + '/' + putId, putObject);
    };
    HttpRequestService.prototype.deleteRequest = function (apiController, id) {
        return this.http.delete(this.url + apiController + '/' + id);
    };
    HttpRequestService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], HttpRequestService);
    return HttpRequestService;
}());
export { HttpRequestService };
//# sourceMappingURL=http.request.service.js.map