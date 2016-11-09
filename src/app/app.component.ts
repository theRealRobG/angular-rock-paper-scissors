import { Component } from '@angular/core';
import '../../public/css/styles.css';

import { ComputerService, UserService } from './services'
import { Choice } from './choice';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ComputerService, UserService]
})
export class AppComponent {
    constructor(
        private computerService: ComputerService,
        private userService: UserService
    ) {}

    public onUserChoice(userChoice: Choice): void {
        let computerChoice = this.computerService.getChoice();
        if (userChoice === computerChoice) {
            return this.onDraw();
        }
        if (this.isStrongerThan(userChoice, computerChoice)) {
            return this.onWin();
        }
        return this.onLose();
    }

    public onWin(): void {
        console.log('YOU WIN!');
        this.computerService.decrementLife();
        this.checkIsGameOver();
        return;
    }

    public onLose(): void {
        console.log('YOU LOSE!');
        this.userService.decrementLife();
        this.checkIsGameOver();
        return;
    }

    public onDraw(): void {
        console.log('A DRAW!');
        return;
    }

    public onGameOver(): void {
        console.log('GAME OVER!');
        this.computerService.resetLife();
        this.userService.resetLife();
        return;
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
