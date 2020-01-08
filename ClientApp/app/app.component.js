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
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from "./app-jwt.module";
import { HttpRequestService } from "./Services/http.request.service";
var AppComponent = /** @class */ (function () {
    function AppComponent(jwtHelper, router, http) {
        this.jwtHelper = jwtHelper;
        this.router = router;
        this.http = http;
        this.userName = 'LogIn';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.setUserName();
    };
    AppComponent.prototype.isUserAuthenticated = function () {
        var token = tokenGetter();
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.setUserName();
            return true;
        }
        else {
            this.resetUserName();
            return false;
        }
    };
    AppComponent.prototype.logOut = function () {
        localStorage.removeItem("jwt");
        this.router.navigate(["/"]);
    };
    AppComponent.prototype.testGet = function () {
        if (this.isUserAuthenticated()) {
            this.http.getRequest('account/getrole')
                .subscribe(function (response) {
                console.log(response);
            }, function (err) {
                console.log(err);
            });
        }
    };
    AppComponent.prototype.setUserName = function () {
        var token = tokenGetter();
        var tokenInfo = this.jwtHelper.decodeToken(token);
        this.userName = tokenInfo.UserName;
    };
    AppComponent.prototype.resetUserName = function () {
        this.userName = "LogIn";
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            providers: [HttpRequestService]
        }),
        __metadata("design:paramtypes", [JwtHelperService, Router, HttpRequestService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map