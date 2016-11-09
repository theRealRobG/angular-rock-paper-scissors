import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ActionBoxComponent } from './components';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        ActionBoxComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
