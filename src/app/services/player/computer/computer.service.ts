import { Injectable } from '@angular/core';

import { Player } from '../player';
import { Choice } from '../../../enums';

export const availableChoices: Array<Choice> = [
    Choice.ROCK, 
    Choice.PAPER, 
    Choice.SCISSORS,
    Choice.LIZARD,
    Choice.SPOCK
];

@Injectable()
export class ComputerService extends Player {
    private choice: Choice;

    public getChoice(): Choice {
        this.generateChoice();
        return this.choice;
    }

    private generateChoice(): void {
        let choiceIndex = Math.floor(Math.random() * availableChoices.length);
        this.choice = availableChoices[choiceIndex];
    }
}