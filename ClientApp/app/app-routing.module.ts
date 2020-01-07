import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { AuthGuard } from "./Services/auth-guard.service";

import { HomeComponent } from "./Home/home.component";
import { LoginComponent } from "./Auth/LogIn/login.component";


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'user',
        component: HomeComponent,
        canActivate: [AuthGuard]
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