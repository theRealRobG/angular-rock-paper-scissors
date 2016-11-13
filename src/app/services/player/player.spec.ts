import { Player } from './player';
import { Choice } from '../../enums';

let userService: Player;

describe('User Service', () => {
    beforeEach(() => {
        userService = new Player();
    });

    it('should have a default player model', () => {
        expect(userService.model).toBeDefined();
        expect(userService.model.remainingLife).toBeDefined();
        expect(userService.model.totalLife).toBeDefined();
    });

    it('should be able to set the total life to a value passed', () => {
        userService.setTotalLife(5);
        expect(userService.model.totalLife).toBe(5);
        userService.setTotalLife(10);
        expect(userService.model.totalLife).toBe(10);
    });

    it('should be able to give you the remaining life when asked', () => {
        userService.model.remainingLife = 1;
        expect(userService.getRemainingLife()).toBe(1);
    });

    it('should be able to decrement the remaining life by 1', () => {
        userService.model.remainingLife = 2;
        userService.decrementLife();
        expect(userService.model.remainingLife).toBe(1);
    });

    it('should be able to reset the remaining life back to the total', () => {
        userService.model.totalLife = 5;
        userService.model.remainingLife = 1;
        userService.resetLife();
        expect(userService.model.remainingLife).toBe(5);
    });
});