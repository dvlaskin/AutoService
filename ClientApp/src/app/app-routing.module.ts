import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { AuthGuard }            from "./Services/auth-guard.service";

import { HomeComponent }        from "./Home/home.component";
import { LoginComponent }       from "./Auth/LogIn/login.component";
import { SignupComponent }      from "./Auth/SignUp/signup.component";
import { UserPanelComponent }   from "./Tasks/user-panel/user-panel.component";


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'user',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'userPanel',
        component: UserPanelComponent,
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