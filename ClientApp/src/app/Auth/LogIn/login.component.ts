import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpRequestService } from "../../Services/http.request.service";


@Component({
    templateUrl: './login.component.html',
    providers: [ HttpRequestService ]
})

export class LoginComponent {

    invalidLogin: boolean;
    
    
    constructor(private httpService: HttpRequestService, private router: Router) { 
        console.log('LoginComponent => constructor');
    }
    
    login(form: NgForm) {
        let credentials = JSON.stringify(form.value);
        
        console.log(credentials);

        this.httpService.postRequest('account/login', form.value)    
            .subscribe(
                response => {
                    let token = (<any>response).access_token;
                    localStorage.setItem("jwt", token);
                    this.invalidLogin = false;
                    this.router.navigate(["/"]);
            }, err => {
                this.invalidLogin = true;
            });
    }
}