import { Component, Output, EventEmitter } from '@angular/core';

import { Choice } from '../../choice';

@Component({
    selector: 'action-box',
    templateUrl: './action-box.component.html',
    styleUrls: ['action-box.component.css']
})
export class ActionBoxComponent {
    public areMainActionsShown = false;
    @Output() public userChoice = new EventEmitter<Choice>();

    public onFight(): void {
        this.areMainActionsShown = true;
    }

    public onRun(): void {
        
    }

    public onRock(): void {
        this.userChoice.emit(Choice.ROCK);
    }

    public onPaper(): void {
        this.userChoice.emit(Choice.PAPER);
    }

    public onScissors(): void {
        this.userChoice.emit(Choice.SCISSORS);
    }

    public onBack(): void {
        this.areMainActionsShown = false;
    }
}