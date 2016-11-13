import { Component } from '@angular/core';
import '../../public/css/styles.css';

import { ComputerService, HumanService, PlayerModel } from './services';
import { Choice, Outcome } from './enums';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ComputerService, HumanService]
})
export class AppComponent {
    public computerModel: PlayerModel;
    public userModel: PlayerModel;
    public gameOverMessage: string;
    public computerChoice: Choice;
    public userOutcome: Outcome;
    public isGameOver = false;
    public isMessageShowing = false;

    constructor(
        private computerService: ComputerService,
        private userService: HumanService
    ) {
        this.computerModel = computerService.model;
        this.userModel = userService.model;
    }

    public onUserChoice(userChoice: Choice): void {
        this.computerChoice = this.computerService.getChoice();
        if (userChoice === this.computerChoice) {
            return this.onDraw();
        }
        if (this.isStrongerThan(userChoice, this.computerChoice)) {
            return this.onWin();
        }
        return this.onLose();
    }

    public onDismissMessage(): void {
        this.isMessageShowing = false;
    }

    public onWin(): void {
        this.userOutcome = Outcome.WIN;
        this.isMessageShowing = true;
        this.computerService.decrementLife();
        this.checkIsGameOver();
        return;
    }

    public onLose(): void {
        this.userOutcome = Outcome.LOSE;
        this.isMessageShowing = true;
        this.userService.decrementLife();
        this.checkIsGameOver();
        return;
    }

    public onDraw(): void {
        this.userOutcome = Outcome.DRAW;
        this.isMessageShowing = true;
        return;
    }

    public onGameOver(): void {
        this.gameOverMessage = `You ${this.userModel.remainingLife === 0 ? 'Lose' : 'Win'}!`;
        this.isGameOver = true;
        return;
    }

    public onRestart(): void {
        this.isMessageShowing = false;
        this.isGameOver = false;
        this.computerService.resetLife();
        this.userService.resetLife();
    }

    private isStrongerThan(firstChoice: Choice, secondChoice: Choice): boolean {
        if (firstChoice === secondChoice) {
            throw new Error('choices must be different for comparison');
        }
        switch(firstChoice) {
            case Choice.ROCK:
                return secondChoice === Choice.SCISSORS;
            case Choice.PAPER:
                return secondChoice === Choice.ROCK;
            case Choice.SCISSORS:
                return secondChoice === Choice.PAPER;
        }
    }

    private checkIsGameOver(): void {
        if (this.computerService.getRemainingLife() === 0 || this.userService.getRemainingLife() === 0) {
            return this.onGameOver();
        }
    }
}
