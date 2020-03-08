import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './home.component.html',
    providers: [ MessageService ]
})

export class HomeComponent {
    
    counter: number = 0;
    
    constructor(private messageService: MessageService)
    {
        
    }
    

    clickBtn()
    {
        this.counter++;
        this.messageService.add({
            severity:'success', 
            summary:'clickBtn',
            detail: `counter = ${this.counter}`
        });
    }
    
}