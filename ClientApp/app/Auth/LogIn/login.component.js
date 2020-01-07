var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HttpRequestService } from "../../Services/http.request.service";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
    }
    LoginComponent.prototype.login = function (form) {
        var _this = this;
        var credentials = JSON.stringify(form.value);
        console.log(credentials);
        this.httpService.postRequest('account/login', form.value)
            .subscribe(function (response) {
            var token = response.access_token;
            localStorage.setItem("jwt", token);
            _this.invalidLogin = false;
            _this.router.navigate(["/"]);
        }, function (err) {
            _this.invalidLogin = true;
        });
    };
    LoginComponent = __decorate([
        Component({
            templateUrl: './login.component.html',
            providers: [HttpRequestService]
        }),
        __metadata("design:paramtypes", [HttpRequestService, Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map