import { Component, Input } from '@angular/core';

@Component({
    selector: 'progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
    @Input() public remaining: number;
    @Input() public total: number;
    public getProgressValue(): number {
        if (!this.total) {
            return 0;
        }
        return this.remaining / this.total;
    }
}