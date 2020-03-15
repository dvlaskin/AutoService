import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';


import { UserPanelComponent }       from "./user-panel/user-panel.component";


@NgModule({
    imports:
        [
            BrowserModule,
            FormsModule
        ],
    declarations: [ UserPanelComponent ],
    exports: [ UserPanelComponent ]

})

export class TasksModule {


}