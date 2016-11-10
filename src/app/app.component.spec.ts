import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ActionBoxComponent, MessageBoxComponent, ProgressBarComponent } from './components';
import { ComputerService, UserService } from './services';

let mockService = {
    model: {
        totalLife: 3,
        remainingLife: 3
    }
};

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ActionBoxComponent,
                MessageBoxComponent,
                ProgressBarComponent
            ],
            providers: [
                { provide: ComputerService, useValue: mockService },
                { provide: UserService, useValue: mockService }
            ]
        });
    });
    
    it('should work', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });

    it('should set the service models', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance.computerModel.totalLife).toBe(3);
        expect(fixture.componentInstance.computerModel.remainingLife).toBe(3);
        expect(fixture.componentInstance.userModel.totalLife).toBe(3);
        expect(fixture.componentInstance.userModel.remainingLife).toBe(3);
    })
});
