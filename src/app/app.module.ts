import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ActionBoxComponent, ProgressBarComponent, MessageBoxComponent } from './components';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        ActionBoxComponent,
        ProgressBarComponent,
        MessageBoxComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
