import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Choice, Outcome } from '../../enums';

const DRAW_MESSAGE = 'The two have cancelled eachother out and no one has lost a life.';
const ROCK_WIN_MESSAGE = 'The rock has smashed the scissors to pieces.';
const PAPER_WIN_MESSAGE = 'Paper covers the rock and it is no more.';
const SCISSORS_WIN_MESSAGE = 'The paper has been shredded by the snips of the scissors.';

@Component({
    selector: 'message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {
    @Input() public computerChoice: Choice;
    @Input() public userOutcome: Outcome;
    @Output() public dismissMessage = new EventEmitter<void>();
    private choiceSentence: string;
    private outcomeSentence: string;

    public getMessage(): string {
        this.buildMessageSentences();
        return `${this.choiceSentence} ${this.outcomeSentence}`;
    }

    public onDismissMessage(): void {
        this.dismissMessage.emit();
    }

    private buildMessageSentences(): void {
        const defaultStart = 'Your opponent has picked';
        switch (this.computerChoice) {
            case Choice.ROCK:
                this.choiceSentence = `${defaultStart} rock.`;
                this.outcomeSentence = this.getRockOutcomeSentence();
                break;
            case Choice.PAPER:
                this.choiceSentence = `${defaultStart} paper.`;
                this.outcomeSentence = this.getPaperOutcomeSentence();
                break;
            case Choice.SCISSORS:
                this.choiceSentence = `${defaultStart} scissors.`;
                this.outcomeSentence = this.getScissorsOutcomeSentence();
                break;
            default:
                this.choiceSentence = '';
                this.outcomeSentence = '';
        }
    }

    private getRockOutcomeSentence(): string {
        if (this.userOutcome === Outcome.DRAW) {
            return DRAW_MESSAGE;
        } else if (this.userOutcome === Outcome.WIN) {
            return PAPER_WIN_MESSAGE;
        }
        return ROCK_WIN_MESSAGE;
    }

    private getPaperOutcomeSentence(): string {
        if (this.userOutcome === Outcome.DRAW) {
            return DRAW_MESSAGE;
        } else if (this.userOutcome === Outcome.WIN) {
            return SCISSORS_WIN_MESSAGE;
        }
        return PAPER_WIN_MESSAGE;
    }

    private getScissorsOutcomeSentence(): string {
        if (this.userOutcome === Outcome.DRAW) {
            return DRAW_MESSAGE;
        } else if (this.userOutcome === Outcome.WIN) {
            return ROCK_WIN_MESSAGE;
        }
        return SCISSORS_WIN_MESSAGE;
    }
}