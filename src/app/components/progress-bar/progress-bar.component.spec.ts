import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';
import { Choice, Outcome } from '../../enums';

let progressBarComponent: ProgressBarComponent;

describe('Progress Bar', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProgressBarComponent
            ]
        });
        progressBarComponent = TestBed.createComponent(ProgressBarComponent).componentInstance;
    });

    it('should return 0 progress if there is no total', () => {
        progressBarComponent.total = undefined;
        expect(progressBarComponent.getProgressValue()).toBe(0);
    });

    it('should return a progress value less than or equal to 1 always', () => {
        progressBarComponent.total = 10;
        for (let i = 0; i < 11; i++) {
            progressBarComponent.remaining = i;
            expect(progressBarComponent.getProgressValue()).toBeLessThanOrEqual(1);
        }
    });
});