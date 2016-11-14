import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HumanService, ComputerService } from '../../services';

const DEFAULT_STARTING_LIFE = 3;

@Component({
    selector: 'main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
    public userChoice: string;
    private noOfLives = DEFAULT_STARTING_LIFE;

    constructor(
        private computerService: ComputerService,
        private humanService: HumanService,
        private router: Router
    ) { }

    public onStartGame(): void {
        if (!parseInt(this.userChoice) && parseInt(this.userChoice) !== 0) {
            return;
        }
        if (!this.userChoice) {
            this.noOfLives = DEFAULT_STARTING_LIFE;
        } else {
            this.noOfLives = parseInt(this.userChoice);
        }
        this.computerService.setTotalLife(this.noOfLives);
        this.humanService.setTotalLife(this.noOfLives);
        this.computerService.resetLife();
        this.humanService.resetLife();
        this.router.navigateByUrl('main-game');
    }
}