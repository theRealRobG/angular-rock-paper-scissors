import { ComputerService } from './computer.service';
import { Choice } from '../../../enums';

let computerService: ComputerService;

describe('Computer Service', () => {
    beforeEach(() => {
        computerService = new ComputerService();
    });

    it('should be able to generate a computer choice', () => {
        const choicesArray: Array<Choice> = [Choice.ROCK, Choice.PAPER, Choice.SCISSORS];
        const computerChoice = computerService.getChoice();
        expect(choicesArray.indexOf(computerChoice) > -1).toBe(true);
    });
});