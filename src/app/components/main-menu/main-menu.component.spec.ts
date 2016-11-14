import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MainMenuComponent } from './main-menu.component';
import { ComputerService, HumanService } from '../../services';
import { Choice } from '../../enums';

let mainMenuComponent: MainMenuComponent;
let computerService: ComputerService;
let humanService: HumanService;
let router: Router;
const mockRouter = {
    navigateByUrl() {}
};
const START_LIFE = 3;
const mockService = {
    model: {
        totalLife: START_LIFE,
        remainingLife: START_LIFE
    },
    decrementLife() { mockService.model.remainingLife-- },
    setTotalLife(value: number) {},
    getRemainingLife(): number {
        return this.model.remainingLife;
    },
    resetLife() {
        this.model.remainingLife = this.model.totalLife;
    },
    getChoice() {}
};

describe('Action Box', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                MainMenuComponent
            ],
            providers: [
                { provide: ComputerService, useValue: mockService },
                { provide: HumanService, useValue: mockService },
                { provide: Router, useValue: mockRouter}
            ]
        });
        let fixture = TestBed.createComponent(MainMenuComponent);
        mainMenuComponent = fixture.componentInstance;
        computerService = fixture.debugElement.injector.get(ComputerService);
        humanService = fixture.debugElement.injector.get(HumanService);
        router = fixture.debugElement.injector.get(Router);
    });

    it('should set up the game with default values if no user choice is passed', () => {
        mainMenuComponent.userChoice = undefined;
        const computerSetTotalLifeSpy = spyOn(computerService, 'setTotalLife');
        const humanSetTotalLifeSpy = spyOn(humanService, 'setTotalLife');
        const computerResetLifeSpy = spyOn(computerService, 'resetLife');
        const humanResetLifeSpy = spyOn(humanService, 'resetLife')
        const routerSpy = spyOn(router, 'navigateByUrl');
        mainMenuComponent.onStartGame();
        expect(computerSetTotalLifeSpy).toHaveBeenCalledWith(3);
        expect(humanSetTotalLifeSpy).toHaveBeenCalledWith(3);
        expect(computerResetLifeSpy).toHaveBeenCalled();
        expect(humanResetLifeSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalledWith('main-game');
    });

    it('set up the game and navigate on start', () => {
        mainMenuComponent.userChoice = 5;
        const computerSetTotalLifeSpy = spyOn(computerService, 'setTotalLife');
        const humanSetTotalLifeSpy = spyOn(humanService, 'setTotalLife');
        const computerResetLifeSpy = spyOn(computerService, 'resetLife');
        const humanResetLifeSpy = spyOn(humanService, 'resetLife')
        const routerSpy = spyOn(router, 'navigateByUrl');
        mainMenuComponent.onStartGame();
        expect(computerSetTotalLifeSpy).toHaveBeenCalledWith(5);
        expect(humanSetTotalLifeSpy).toHaveBeenCalledWith(5);
        expect(computerResetLifeSpy).toHaveBeenCalled();
        expect(humanResetLifeSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalledWith('main-game');
    });
})
