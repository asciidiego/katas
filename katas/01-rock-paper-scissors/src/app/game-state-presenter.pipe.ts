import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameStatePresenter',
})
export class GameStatePresenterPipe implements PipeTransform {
  transform(gameState: string | null): string {
    if (!gameState) return '-';

    if (gameState === 'start') return 'The match has started!';
    if (gameState === 'draw') return 'That was a tough one... DRAW!';
    if (gameState === 'player1-win') return 'Player 1 won!';
    if (gameState === 'player2-win') return 'Player 2 won!';

    return '...';
  }
}
