import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ActionBoxComponent } from './action-box.component';
import { Choice } from '../../enums';

let actionBoxComponent: ActionBoxComponent;
const mockRouter = {
    navigateByUrl() {}
};

describe('Action Box', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ActionBoxComponent
            ],
            providers: [
                { provide: Router, useValue: mockRouter}
            ]
        });
        actionBoxComponent = TestBed.createComponent(ActionBoxComponent).componentInstance;
    });

    it('should show the main actions on fight', () => {
        actionBoxComponent.areMainActionsShown = false;
        actionBoxComponent.onFight();
        expect(actionBoxComponent.areMainActionsShown).toBe(true);
    });

    it('should hide the main actions on back', () => {
        actionBoxComponent.areMainActionsShown = true;
        actionBoxComponent.onBack();
        expect(actionBoxComponent.areMainActionsShown).toBe(false);
    });

    it('should emit a user choice event with rock on choosing rock', () => {
        const userChoiceSpy = spyOn(actionBoxComponent.userChoice, 'emit');
        actionBoxComponent.onRock();
        expect(userChoiceSpy).toHaveBeenCalledWith(Choice.ROCK);
    });

    it('should emit a user choice event with paper on choosing paper', () => {
        const userChoiceSpy = spyOn(actionBoxComponent.userChoice, 'emit');
        actionBoxComponent.onPaper();
        expect(userChoiceSpy).toHaveBeenCalledWith(Choice.PAPER);
    });

    it('should emit a user choice event with scissors on choosing scissors', () => {
        const userChoiceSpy = spyOn(actionBoxComponent.userChoice, 'emit');
        actionBoxComponent.onScissors();
        expect(userChoiceSpy).toHaveBeenCalledWith(Choice.SCISSORS);
    });
})