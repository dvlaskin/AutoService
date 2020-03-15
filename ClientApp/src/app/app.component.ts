import {Component, OnInit}      from '@angular/core';
import { Router, NavigationEnd }               from '@angular/router';
import { JwtHelperService }     from '@auth0/angular-jwt';
import { tokenGetter }          from "./app-jwt.module";
import { HttpRequestService }   from "./Services/http.request.service";
import { MenuItem }             from 'primeng/api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ HttpRequestService ]
})


export class AppComponent implements OnInit {
    
    userName = 'LogIn';
    isUserAuthenticated: boolean;
    items: MenuItem[];

    constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpRequestService) 
    {
        console.log('AppComponent => constructor');

        router.events.subscribe(e => {
            if(e instanceof NavigationEnd)
            {
                console.log(e);
                if (e.url === '/')
                {
                    this.ngOnInit();
                }
            }
        });
    }

    ngOnInit(): void 
    {  
        console.log('AppComponent => ngOnInit');
        
        this.CheckUserAuth();
        this.setUserName();
        
        if (this.isUserAuthenticated)
        {
            this.AuthenticatedMenuBar();
        }
        else 
        {
            this.NotAuthenticatedMenuBar();
        }
        
        
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
        
        return this.isUserAuthenticated;
    }

    AuthenticatedMenuBar()
    {
        this.items = 
        [
            {
                label: 'Home',
                routerLink: [ '/home' ]
            },
            {
                label: 'Tasks',
                routerLink: [ '/userPanel' ]
            },
            {
                label: 'CheckRole',
                command: () => this.testGet()
            },
            {
                label: this.userName,
                icon: 'pi pi-fw pi-file',
                items: [
                    { label: 'Settings' },
                    { separator:true },
                    { label: 'Quit' }
                ]
            },
            {separator:true},
            {
                label: 'Quit', icon: 'pi pi-fw pi-times', command: () => this.logOut()
            }
        ];
    }
    
    NotAuthenticatedMenuBar()
    {
        this.items =
        [
            {
                label: 'Home',
                routerLink: [ '/home' ],
                styleClass: 'style-menubar'
            },
            {
                label: 'SignUp',
                routerLink: ['/signup']
            },
            {
                label: 'LogIn', 
                routerLink: ['/login']
            }
        ]
    }

    public logOut() 
    {
        console.log('AppComponent => logOut');
        localStorage.removeItem("jwt");
        this.ngOnInit();
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
        if (token)
        {
            const tokenInfo = this.jwtHelper.decodeToken(token);
            this.userName = tokenInfo.UserName;
        } 
    }
    
    private resetUserName()
    {
        this.userName = '';
    }
}