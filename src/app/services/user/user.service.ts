import { Injectable } from '@angular/core';

import { Player, PlayerModel } from '../../interfaces/player';

@Injectable()
export class UserService implements Player {
    public model: PlayerModel = {
        totalLife: 3,
        remainingLife: 3
    };

    public getRemainingLife(): number {
        return this.model.remainingLife;
    }

    public decrementLife(): void {
        this.model.remainingLife--;
    }

    public resetLife(): void {
        this.model.remainingLife = 3;
    }
}