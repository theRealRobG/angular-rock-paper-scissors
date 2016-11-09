import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ActionBoxComponent } from './components'

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [AppComponent, ActionBoxComponent] });
    });
    
    it('should work', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });
});
