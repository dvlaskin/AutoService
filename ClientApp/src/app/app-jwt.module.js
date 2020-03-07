var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
export function tokenGetter() {
    return localStorage.getItem("jwt");
}
var AppJwtModule = /** @class */ (function () {
    function AppJwtModule() {
    }
    AppJwtModule = __decorate([
        NgModule({
            imports: [
                JwtModule.forRoot({
                    config: {
                        tokenGetter: tokenGetter,
                        whitelistedDomains: ["localhost"],
                        blacklistedRoutes: []
                    }
                })
            ],
            exports: [
                JwtModule
            ]
        })
    ], AppJwtModule);
    return AppJwtModule;
}());
export { AppJwtModule };
//# sourceMappingURL=app-jwt.module.js.map