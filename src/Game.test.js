import { getGameStatus } from "./Game";

describe('Game', () => {
    it('has no winner when beginning', () => {
        const squares = [
            null, null, null,
            null, null, null,
            null, null, null
        ];
        const status = getGameStatus(squares)
        expect(status.inProgress).toBe(true)
    });

    it('detects O winner', () => {
        const squares = [
            'O', 'O', 'O',
            'X', 'X', null,
            null, null, null,
        ];
        const status = getGameStatus(squares)
        expect(status.winner).toBe('O')
    })

    it('detects draw', () => {
        const squares = [
            'O', 'X', 'O',
            'X', 'O', 'O',
            'X', 'O', 'X',
        ];
        const status = getGameStatus(squares)
        expect(status.draw).toBe(true)
    });
});
