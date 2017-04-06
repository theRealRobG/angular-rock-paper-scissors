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
        this.onChoice(Choice.ROCK);
    }

    public onPaper(): void {
        this.onChoice(Choice.PAPER);
    }

    public onScissors(): void {
        this.onChoice(Choice.SCISSORS);
    }

    public onSpock(): void {
        this.onChoice(Choice.SPOCK);
    }

    public onLizard(): void {
        this.onChoice(Choice.LIZARD);
    }

    public onBack(): void {
        this.areMainActionsShown = false;
    }

    private onChoice(choice: Choice): void {
        this.userChoice.emit(choice);
        this.onBack();
    }
}