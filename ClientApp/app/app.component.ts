import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from "./app-jwt.module";
import { HttpRequestService } from "./Services/http.request.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ HttpRequestService ]
})

export class AppComponent {

    constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpRequestService) {}

    isUserAuthenticated() {
        
        let token: string = tokenGetter();
        
        if (token && !this.jwtHelper.isTokenExpired(token)) 
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    public logOut() {
        
        localStorage.removeItem("jwt");
        this.router.navigate(["/"]);
    }
    
    public testGet()
    {
        this.http.getRequest('account/getrole')
            .subscribe(response => 
                {                
                    console.log(response);
                }, err => 
                {
                    console.log(err);
                }
            );
    }

}