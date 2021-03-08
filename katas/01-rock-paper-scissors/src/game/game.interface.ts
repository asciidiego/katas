import { GameTurn } from './game-turn.interface';
import { Player } from './player.interface';
import { Weapon } from './weapon.interface';

export interface Game {
  /**
   * Return the id of the winner of the match
   * @param turn game turn
   */
  evaluateMatch(turn: GameTurn): GameOutcome;
  /**
   * Select a game mode
   *
   * @param mode game mode
   */
  pickMode(mode: string): void;

  /**
   * Return a list of available weapons
   */
  getWeaponList(): Weapon[];
}

export interface GameOutcome {
  type: 'winning' | 'draw';
  winningPlayer?: Player['id'];
}
