import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from "@angular/router";
import { HttpRequestService } from "../../Services/http.request.service";


@Component({
    templateUrl: './signup.component.html',
    providers: [ HttpRequestService ]
})

export class SignupComponent {

    invalidLogin: boolean;


    constructor(private httpService: HttpRequestService, private router: Router) {

    }

    signup(form: NgForm) {
        let credentials = JSON.stringify(form.value);

        console.log(credentials);

        this.httpService.postRequest('account/signup', form.value)
            .subscribe(
                response => {
                    let token = (<any>response).access_token;
                    console.log(token);
                    localStorage.setItem("jwt", token);
                    this.invalidLogin = false;
                    this.router.navigate(["/"]);
                }, err => {
                    console.log(err);
                    this.invalidLogin = true;
                });
    }
}