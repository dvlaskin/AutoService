import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from "./app-jwt.module";
import { HttpRequestService } from "./Services/http.request.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ HttpRequestService ]
})

export class AppComponent implements OnInit {
    
    userName = 'LogIn';

    constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpRequestService) {}

    ngOnInit(): void {        
        this.setUserName();
    }

    isUserAuthenticated() {
        
        const token: string = tokenGetter();
        
        if (token && !this.jwtHelper.isTokenExpired(token)) 
        {
            this.setUserName();
            return true;
        }
        else 
        {
            this.resetUserName();
            return false;
        }
    }

    public logOut() {
        
        localStorage.removeItem("jwt");
        this.router.navigate(["/"]);
    }
    
    public testGet()
    {
        if (this.isUserAuthenticated()) 
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

    private setUserName()
    {
        const token: string = tokenGetter();
        const tokenInfo = this.jwtHelper.decodeToken(token);
        this.userName = tokenInfo.UserName;
 
    }
    
    private resetUserName()
    {
        this.userName = "LogIn";
    }
}