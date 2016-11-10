import { Injectable } from '@angular/core';

import { Player, PlayerModel } from '../../interfaces/player';
import { Choice } from '../../enums';

const choicesArray: Array<Choice> = [Choice.ROCK, Choice.PAPER, Choice.SCISSORS];

@Injectable()
export class ComputerService implements Player {
    public model: PlayerModel = {
        totalLife: 3,
        remainingLife: 3
    };
    private choice: Choice;

    public getRemainingLife(): number {
        return this.model.remainingLife;
    }

    public decrementLife(): void {
        this.model.remainingLife--;
    }

    public resetLife(): void {
        this.model.remainingLife = 3;
    }

    public getChoice(): Choice {
        this.generateChoice();
        return this.choice;
    }

    private generateChoice(): void {
        let choiceIndex = Math.floor(Math.random() * 3);
        this.choice = choicesArray[choiceIndex];
    }
}