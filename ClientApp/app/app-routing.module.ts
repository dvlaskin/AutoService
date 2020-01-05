import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

import { AppComponent } from "./app.component";
import { LoginComponent } from "./Auth/LogIn/login.component";

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false, // <-- debugging purposes only
                preloadingStrategy: SelectivePreloadingStrategyService,
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }