import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ComputerService, HumanService } from '../../services'
import { gameOverRouteParam, mainGameRoute, mainMenuRoute, victoryOutcome, lossOutcome } from '../../constants';

@Component({
    selector: 'game-over',
    templateUrl: 'game-over.component.html',
    styleUrls: ['game-over.component.css']
})
export class GameOverComponent implements OnInit {
    public gameOverMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        computerService: ComputerService,
        userService: HumanService
    ) {
        computerService.resetLife();
        userService.resetLife();
    }

    public ngOnInit(): void {
        this.route.params
            .subscribe(params => {
                const outcome: string = params[gameOverRouteParam];
                this.gameOverMessage = this.getGameOverMessage(outcome);
            });
    }

    public onRestart(): void {
        this.router.navigateByUrl(mainGameRoute);
    }

    public goToMainMenu(): void {
        this.router.navigateByUrl(mainMenuRoute);
    }

    private getGameOverMessage(outcome: string): string {
        switch(outcome) {
            case victoryOutcome:
                return 'YOU WIN!';
            case lossOutcome:
                return 'YOU LOSE!';
            default:
                return 'SOMETHING WENT WRONG!';
        }
    }
}
