import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Choice } from '../../enums';

@Component({
    selector: 'action-box',
    templateUrl: './action-box.component.html',
    styleUrls: ['action-box.component.css']
})
export class ActionBoxComponent {
    public areMainActionsShown = false;
    @Output() public userChoice = new EventEmitter<Choice>();

    constructor(private router: Router) { }

    public onFight(): void {
        this.areMainActionsShown = true;
    }

    public onRun(): void {
        this.router.navigateByUrl('main-menu');
    }

    public onRock(): void {
        this.userChoice.emit(Choice.ROCK);
        this.onBack();
    }

    public onPaper(): void {
        this.userChoice.emit(Choice.PAPER);
        this.onBack();
    }

    public onScissors(): void {
        this.userChoice.emit(Choice.SCISSORS);
        this.onBack();
    }

    public onBack(): void {
        this.areMainActionsShown = false;
    }
}