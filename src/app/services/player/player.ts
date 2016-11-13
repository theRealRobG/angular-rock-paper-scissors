export interface PlayerModel {
    totalLife: number;
    remainingLife: number;
}

export class Player {
    public model: PlayerModel = {
        totalLife: 3,
        remainingLife: 3
    };

    public setTotalLife(value: number): void {
        this.model.totalLife = value;
    }

    public getRemainingLife(): number {
        return this.model.remainingLife;
    }

    public decrementLife(): void {
        this.model.remainingLife--;
    }

    public resetLife(): void {
        this.model.remainingLife = this.model.totalLife;
    }
}