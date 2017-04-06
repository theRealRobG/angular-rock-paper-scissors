import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GameOverComponent } from './game-over.component';
import { Choice } from '../../enums';
import { ComputerService, HumanService } from '../../services';

let componentFixture: ComponentFixture<GameOverComponent>;
let gameOverComponent: GameOverComponent;
let computerResetLifeCalled = false;
let humanResetLifeCalled = false;
const winParams = {
    outcome: 'win'
};
const lossParams = {
    outcome: 'lose'
}
const mockRouter = {
    navigateByUrl() {}
};
const computerMockService = {
    model: {
        totalLife: 3,
        remainingLife: 3
    },
    resetLife() {
        this.model.remainingLife = this.model.totalLife;
        computerResetLifeCalled = true;
    }
};
const humanMockService = {
    model: {
        totalLife: 3,
        remainingLife: 3
    },
    resetLife() {
        this.model.remainingLife = this.model.totalLife;
        humanResetLifeCalled = true;
    }
};
const mockRoute = {
    params: {
        subscribe: (callback: (params: Params) => void) => {
            callback(winParams);
        }
    }
}
let computerServiceResetLifeSpy: jasmine.Spy;
let humanServiceResetLifeSpy: jasmine.Spy;

describe('Game Over', () => {
    beforeEach(() => {
        computerResetLifeCalled = false;
        humanResetLifeCalled = false;
        TestBed.configureTestingModule({
            declarations: [
                GameOverComponent
            ],
            providers: [
                { provide: Router, useValue: mockRouter},
                { provide: ActivatedRoute, useValue: mockRoute},
                { provide: ComputerService, useValue: computerMockService },
                { provide: HumanService, useValue: humanMockService },
            ]
        });
        componentFixture = TestBed.createComponent(GameOverComponent);
        gameOverComponent = componentFixture.componentInstance;
    });

    it('should immediately reset all life', () => {
        expect(computerResetLifeCalled).toBe(true);
        expect(humanResetLifeCalled).toBe(true);
    });

    it('should set the game over message on init', () => {
        expect(gameOverComponent.gameOverMessage).toBeUndefined();
        componentFixture.detectChanges();
        expect(gameOverComponent.gameOverMessage).toBeDefined();
        expect(typeof gameOverComponent.gameOverMessage).toBe('string');
    });

    it('should navigate back to the main game on restart', () => {
        const router = componentFixture.debugElement.injector.get(Router);
        const routerNavigateByUrlSpy = spyOn(router, 'navigateByUrl');
        gameOverComponent.onRestart();
        expect(routerNavigateByUrlSpy).toHaveBeenCalledWith('main-game');
    });

    it('should navigate to the main menu on navigate to main menu', () => {
        const router = componentFixture.debugElement.injector.get(Router);
        const routerNavigateByUrlSpy = spyOn(router, 'navigateByUrl');
        gameOverComponent.goToMainMenu();
        expect(routerNavigateByUrlSpy).toHaveBeenCalledWith('main-menu');
    });
});
