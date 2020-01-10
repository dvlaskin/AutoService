import { NgModule }                 from '@angular/core';
import { ButtonModule }             from 'primeng/button';
import { InputSwitchModule }        from 'primeng/inputswitch';

@NgModule({

    exports: [
        ButtonModule,
        InputSwitchModule
    ]

})

export class AppPrimengModule { }