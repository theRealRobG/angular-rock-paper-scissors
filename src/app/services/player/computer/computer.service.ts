import { Injectable } from '@angular/core';

import { Player } from '../player';
import { Choice } from '../../../enums';

const choicesArray: Array<Choice> = [Choice.ROCK, Choice.PAPER, Choice.SCISSORS];

@Injectable()
export class ComputerService extends Player {
    private choice: Choice;

    public getChoice(): Choice {
        this.generateChoice();
        return this.choice;
    }

    private generateChoice(): void {
        let choiceIndex = Math.floor(Math.random() * 3);
        this.choice = choicesArray[choiceIndex];
    }
}