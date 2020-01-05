import { Component } from '@angular/core';
import { HttpRequestService } from "../../Services/http.request.service";


@Component({
    templateUrl: './login.component.html',
    providers: [ HttpRequestService ]
})

export class LoginComponent {
    email='';

    constructor(private httpService: HttpRequestService) { 
        
    }
    
    sendRequest()
    {  
        console.log(this.email);
        this.httpService.postRequest('account/login', this.email)
            .subscribe((resp) => console.log(resp));
    }
}