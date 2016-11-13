import { TestBed, ComponentFixture } from '@angular/core/testing';

import { MessageBoxComponent } from './message-box.component';
import { Choice, Outcome } from '../../enums';

let messageBoxComponent: MessageBoxComponent;
function getInitialMessageBoxSentence(): string {
    return messageBoxComponent.getMessage().split('.')[0];
}
function getRestOfMessageBoxSentence(): string {
    return messageBoxComponent.getMessage().split('.').slice(1).join('.');
}

describe('Message Box', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MessageBoxComponent
            ]
        });
        messageBoxComponent = TestBed.createComponent(MessageBoxComponent).componentInstance;
    });

    it('should emit a dismiss message event on dismissing messages', () => {
        const onDismissSpy = spyOn(messageBoxComponent.dismissMessage, 'emit');
        messageBoxComponent.onDismissMessage();
        expect(onDismissSpy).toHaveBeenCalled();
    });

    it('the user outcome should not affect the initial sentence in the message', () => {
        messageBoxComponent.computerChoice = Choice.PAPER;
        messageBoxComponent.userOutcome = Outcome.DRAW;
        const drawMessageInitialSentence = getInitialMessageBoxSentence();
        messageBoxComponent.userOutcome = Outcome.LOSE;
        const loseMessageInitialSentence = getInitialMessageBoxSentence();
        messageBoxComponent.userOutcome = Outcome.WIN;
        const winMessageInitialSentence = getInitialMessageBoxSentence();
        expect(drawMessageInitialSentence).toEqual(loseMessageInitialSentence);
        expect(drawMessageInitialSentence).toEqual(winMessageInitialSentence);
        expect(loseMessageInitialSentence).toEqual(winMessageInitialSentence);
    });

    it('should contain the computer choice in the first sentence', () => {
        messageBoxComponent.userOutcome = Outcome.DRAW;
        messageBoxComponent.computerChoice = Choice.ROCK;
        const rockInitialSentence = getInitialMessageBoxSentence();
        messageBoxComponent.computerChoice = Choice.PAPER;
        const paperInitialSentence = getInitialMessageBoxSentence();
        messageBoxComponent.computerChoice = Choice.SCISSORS;
        const scissorsInitialSentence = getInitialMessageBoxSentence();
        expect(rockInitialSentence.indexOf('rock') > -1).toBe(true);
        expect(paperInitialSentence.indexOf('paper') > -1).toBe(true);
        expect(scissorsInitialSentence.indexOf('scissors') > -1).toBe(true);
    });

    it('should always have the same final sentence on a draw', () => {
        messageBoxComponent.userOutcome = Outcome.DRAW;
        messageBoxComponent.computerChoice = Choice.ROCK;
        const rockRestOfSentence = getRestOfMessageBoxSentence();
        messageBoxComponent.computerChoice = Choice.PAPER;
        const paperRestOfSentence = getRestOfMessageBoxSentence();
        messageBoxComponent.computerChoice = Choice.SCISSORS;
        const scissorsRestOfSentence = getRestOfMessageBoxSentence();
        expect(rockRestOfSentence).toEqual(paperRestOfSentence);
        expect(rockRestOfSentence).toEqual(scissorsRestOfSentence);
        expect(paperRestOfSentence).toEqual(scissorsRestOfSentence);
    });
});