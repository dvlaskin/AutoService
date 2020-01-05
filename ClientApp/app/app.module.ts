import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppRoutingModule }        from './app-routing.module';

import { AppComponent }   from './app.component';
import { HomeComponent } from "./Home/home.component";
import { LoginComponent } from "./Auth/LogIn/login.component";


@NgModule({
    imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule ],
    declarations: [ AppComponent, HomeComponent, LoginComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule {
    

}