import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { FormsModule }              from '@angular/forms';
import { HttpClientModule }         from '@angular/common/http';


import { AppRoutingModule }         from './app-routing.module';
import { AppJwtModule}              from "./app-jwt.module";
import { AppPrimengModule }         from "./app-primeng.module";
import { AuthGuard }                from "./Services/auth-guard.service";


import { AppComponent }             from './app.component';
import { HomeComponent }            from "./Home/home.component";
import { LoginComponent }           from "./Auth/LogIn/login.component";
import { SignupComponent }          from "./Auth/SignUp/signup.component";
import { TasksModule }              from "./Tasks/tasks.module";



@NgModule({
    imports:      
        [ 
            BrowserModule, 
            BrowserAnimationsModule,
            FormsModule,            
            AppRoutingModule, 
            AppJwtModule,
            AppPrimengModule,
            HttpClientModule,
            TasksModule
        ],
    declarations: [ AppComponent, HomeComponent, LoginComponent, SignupComponent ],
    providers: [ AuthGuard ],
    bootstrap:    [ AppComponent ]
})

export class AppModule {
    

}