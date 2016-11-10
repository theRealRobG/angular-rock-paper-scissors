import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ActionBoxComponent, MessageBoxComponent, ProgressBarComponent } from './components'

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ActionBoxComponent,
                MessageBoxComponent,
                ProgressBarComponent
            ]
        });
    });
    
    it('should work', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });
});
