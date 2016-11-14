import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MainGameComponent } from './main-game.component';
import { ActionBoxComponent, MessageBoxComponent, ProgressBarComponent } from '..';
import { ComputerService, HumanService } from '../../services';
import { Choice, Outcome } from '../../enums';

let fixture: ComponentFixture<MainGameComponent>;
let appComponent: MainGameComponent;

const mockRouter = {
    navigateByUrl() {}
};

describe('App', () => {
    describe('On initialisation', () => {
        const START_LIFE = 3;

        beforeEach(() => {
            let mockService = {
                model: {
                    totalLife: START_LIFE,
                    remainingLife: START_LIFE
                }
            };
            TestBed.configureTestingModule({
                declarations: [
                    MainGameComponent,
                    ActionBoxComponent,
                    MessageBoxComponent,
                    ProgressBarComponent
                ],
                providers: [
                    { provide: ComputerService, useValue: mockService },
                    { provide: HumanService, useValue: mockService },
                    { provide: Router, useValue: mockRouter}
                ]
            });
            fixture = TestBed.createComponent(MainGameComponent);
            appComponent = fixture.componentInstance;
        });

        it('should set the service models', () => {
            expect(appComponent.computerModel.totalLife).toBe(START_LIFE);
            expect(appComponent.computerModel.remainingLife).toBe(START_LIFE);
            expect(appComponent.userModel.totalLife).toBe(START_LIFE);
            expect(appComponent.userModel.remainingLife).toBe(START_LIFE);
        });

        it('should not be displaying the gameOverMessage', () => {
            expect(appComponent.isGameOver).toBe(false);
        });

        it('should not be displaying any info message', () => {
            expect(appComponent.isMessageShowing).toBe(false);
        });
    });

    describe('On action', () => {
        let computerService: ComputerService;
        let userService: HumanService;
        const START_LIFE = 3;
        
        beforeEach(() => {
            let mockService = {
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
            TestBed.configureTestingModule({
                declarations: [
                    MainGameComponent,
                    ActionBoxComponent,
                    MessageBoxComponent,
                    ProgressBarComponent
                ],
                providers: [
                    { provide: ComputerService, useValue: mockService },
                    { provide: HumanService, useValue: mockService },
                    { provide: Router, useValue: mockRouter}
                ]
            });
            fixture = TestBed.createComponent(MainGameComponent);
            appComponent = fixture.componentInstance;
            computerService = fixture.debugElement.injector.get(ComputerService);
            userService = fixture.debugElement.injector.get(HumanService);
        });

        it('should not display the info message on dismissal', () => {
            appComponent.isMessageShowing = true;
            expect(appComponent.isMessageShowing).toBe(true);
            appComponent.onDismissMessage();
            expect(appComponent.isMessageShowing).toBe(false);
        });

        it('should set the user outcome to win on a win', () => {
            appComponent.userOutcome = undefined;
            appComponent.onWin();
            expect(appComponent.userOutcome).toBe(Outcome.WIN);
        });

        it('should decrement the computer\'s life on a win', () => {
            const decrementLifeSpy = spyOn(computerService, 'decrementLife');
            appComponent.onWin();
            expect(decrementLifeSpy).toHaveBeenCalledTimes(1);
        });

        it('should set the user outcome to lose on a loss', () => {
            appComponent.userOutcome = undefined;
            appComponent.onLose();
            expect(appComponent.userOutcome).toBe(Outcome.LOSE);
        });

        it('should decrement the user\'s life on a loss', () => {
            const decrementLifeSpy = spyOn(userService, 'decrementLife');
            appComponent.onLose();
            expect(decrementLifeSpy).toHaveBeenCalledTimes(1);
        });

        it('should set the user outcome to a draw on a draw', () => {
            appComponent.userOutcome = undefined;
            appComponent.onDraw();
            expect(appComponent.userOutcome).toBe(Outcome.DRAW);
        });

        it('should not decrement any life on a draw', () => {
            expect(appComponent.computerModel.remainingLife).toBe(START_LIFE);
            expect(appComponent.userModel.remainingLife).toBe(START_LIFE);
            appComponent.onDraw();
            expect(appComponent.computerModel.remainingLife).toBe(START_LIFE);
            expect(appComponent.userModel.remainingLife).toBe(START_LIFE);
        });

        it('should always display a message after any outcome', () => {
            appComponent.isMessageShowing = false;
            appComponent.onWin();
            expect(appComponent.isMessageShowing).toBe(true);
            appComponent.isMessageShowing = false;
            appComponent.onLose();
            expect(appComponent.isMessageShowing).toBe(true);
            appComponent.isMessageShowing = false;
            appComponent.onDraw();
            expect(appComponent.isMessageShowing).toBe(true);
        });

        it('should set the game over message when the game is over', () => {
            expect(appComponent.gameOverMessage).toBe(undefined);
            expect(appComponent.isGameOver).toBe(false);
            appComponent.onGameOver();
            expect(appComponent.isGameOver).toBe(true);
            expect(appComponent.gameOverMessage).not.toBe(undefined);
            expect(typeof appComponent.gameOverMessage === 'string').toBe(true);
            expect(appComponent.gameOverMessage.length).toBeGreaterThan(0);
        });

        it('should remove all messaging and reset the life on a restart', () => {
            appComponent.isMessageShowing = true;
            appComponent.isGameOver = true;
            appComponent.computerModel.remainingLife = 1;
            appComponent.userModel.remainingLife = 0;
            appComponent.onRestart();
            expect(appComponent.isMessageShowing).toBe(false);
            expect(appComponent.isGameOver).toBe(false);
            expect(appComponent.computerModel.remainingLife).toBe(START_LIFE);
            expect(appComponent.userModel.remainingLife).toBe(START_LIFE);
        });

        it('should get the computer choice on a user choice', () => {
            const computerChoiceSpy = spyOn(computerService, 'getChoice');
            appComponent.onUserChoice(Choice.PAPER);
            expect(computerChoiceSpy).toHaveBeenCalled();
        });

        it('should return a draw if the choices are the same', () => {
            const onDrawSpy = spyOn(appComponent, 'onDraw');
            spyOn(computerService, 'getChoice').and.returnValue(Choice.ROCK); 
            appComponent.onUserChoice(Choice.ROCK);
            expect(onDrawSpy).toHaveBeenCalled();
        });

        it('should register a win for rock beating scissors', () => {
            const onWinSpy = spyOn(appComponent, 'onWin');
            spyOn(computerService, 'getChoice').and.returnValue(Choice.SCISSORS); 
            appComponent.onUserChoice(Choice.ROCK);
            expect(onWinSpy).toHaveBeenCalled();
        });

        it('should register a loss for rock losing to paper', () => {
            const onLoseSpy = spyOn(appComponent, 'onLose');
            spyOn(computerService, 'getChoice').and.returnValue(Choice.PAPER); 
            appComponent.onUserChoice(Choice.ROCK);
            expect(onLoseSpy).toHaveBeenCalled();
        });

        it('should register a win for scissors beating paper', () => {
            const onWinSpy = spyOn(appComponent, 'onWin');
            spyOn(computerService, 'getChoice').and.returnValue(Choice.PAPER); 
            appComponent.onUserChoice(Choice.SCISSORS);
            expect(onWinSpy).toHaveBeenCalled();
        });
    });
});
