import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';

import { AppRoutingModule }        from './app-routing.module';

import { AppComponent }   from './app.component';
import { LoginComponent } from "./Auth/LogIn/login.component";


@NgModule({
    imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
    declarations: [ AppComponent, LoginComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule {
    

}