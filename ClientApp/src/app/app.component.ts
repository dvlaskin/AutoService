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
    isUserAuthenticated: boolean;

    constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpRequestService) 
    {}

    ngOnInit(): void {  
        this.CheckUserAuth();
        this.setUserName();
    }

    CheckUserAuth() {
        
        const token: string = tokenGetter();
        
        if (token && !this.jwtHelper.isTokenExpired(token)) 
        {
            this.setUserName();
            this.isUserAuthenticated = true;
        }
        else 
        {
            this.resetUserName();
            this.isUserAuthenticated = false;
        }
        
        // console.log(this.isUserAuthenticated);
        return this.isUserAuthenticated;
    }

    public logOut() {
        
        localStorage.removeItem("jwt");
        this.CheckUserAuth();
        this.router.navigate(["/"]);
    }
    
    public testGet()
    {
        if (this.isUserAuthenticated) 
        {
            this.http.getRequest('account/getrole')                
                .subscribe(response =>
                    {
                        console.log(response['result']);
                        alert(response['result']);                        
                    }, err =>
                    {
                        console.log(err);
                        alert(err);
                    }
                );
        }      

    }

    private setUserName()
    {
        const token: string = tokenGetter();
        if (token != null)
        {
            const tokenInfo = this.jwtHelper.decodeToken(token);
            this.userName = tokenInfo.UserName;
        } 
    }
    
    private resetUserName()
    {
        this.userName = "LogIn";
    }
}