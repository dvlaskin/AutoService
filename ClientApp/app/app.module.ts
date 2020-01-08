﻿import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppJwtModule}      from "./app-jwt.module";

import { AppComponent }     from './app.component';
import { HomeComponent }    from "./Home/home.component";
import { LoginComponent }   from "./Auth/LogIn/login.component";


@NgModule({
    imports:      
        [ 
            BrowserModule, 
            FormsModule,            
            AppRoutingModule, 
            AppJwtModule,
            HttpClientModule 
        ],
    declarations: [ AppComponent, HomeComponent, LoginComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule {
    

}