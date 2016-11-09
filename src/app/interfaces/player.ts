export interface PlayerModel {
    totalLife: number;
    remainingLife: number;
}

export interface Player {
    model: PlayerModel;
    getRemainingLife(): number;
    decrementLife(): void;
    resetLife(): void;
}