import { ComputerService, availableChoices } from './computer.service';
import { Choice } from '../../../enums';

let computerService: ComputerService;

describe('Computer Service', () => {
    beforeEach(() => {
        computerService = new ComputerService();
    });

    it('should be able to generate a computer choice', () => {
        const computerChoice = computerService.getChoice();
        expect(availableChoices.indexOf(computerChoice) > -1).toBe(true);
    });
});