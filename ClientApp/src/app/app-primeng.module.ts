import { NgModule }                 from '@angular/core';
import { ButtonModule }             from 'primeng/button';
import { InputSwitchModule }        from 'primeng/inputswitch';
import { ToastModule }              from 'primeng/toast';
import { MessagesModule }           from 'primeng/messages';
import { MessageModule }            from 'primeng/message';
import { MenubarModule }            from 'primeng/menubar';


@NgModule({

    exports: [
        ButtonModule,
        InputSwitchModule,
        ToastModule,
        MessagesModule,
        MessageModule,
        MenubarModule
    ]

})

export class AppPrimengModule { }