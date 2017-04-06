import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app.component';
import {
    MainGameComponent,
    MainMenuComponent,
    GameOverComponent,
    ActionBoxComponent,
    ProgressBarComponent,
    MessageBoxComponent
} from './components';
import { ComputerService, HumanService } from './services';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        MainMenuComponent,
        MainGameComponent,
        GameOverComponent,
        ActionBoxComponent,
        ProgressBarComponent,
        MessageBoxComponent
    ],
    providers: [
        ComputerService,
        HumanService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
