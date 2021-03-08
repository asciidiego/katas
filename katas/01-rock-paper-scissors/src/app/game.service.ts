import { Injectable } from '@angular/core';
import {
  Game,
  GameOutcome,
  GameTurn,
  MatchEngine,
  StandardGame,
  StandardMatchEngine,
  Weapon,
  WeaponRules,
} from '@game';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface PlayerScores {
  player1: number;
  player2: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly _engine: MatchEngine;
  private readonly _gameInstance: Game;
  private readonly gameModeSubject = new BehaviorSubject('');
  private readonly gameStateSubject = new BehaviorSubject('start');

  /**
   * @todo can be refactored to use better data structure
   * @todo move into core layers
   */
  private readonly scoresSubject = new BehaviorSubject<PlayerScores>({
    player1: 0,
    player2: 0,
  });

  /**
   * Scores of the two players as observable
   */
  readonly scores$ = this.scoresSubject.asObservable();

  /**
   * Game mode as observable
   */
  readonly mode$ = this.gameModeSubject
    .asObservable()
    .pipe(filter((mode) => !!mode));

  /**
   * Game state as observable
   */
  readonly state$ = this.gameStateSubject.asObservable();

  private readonly weaponsSubject = new BehaviorSubject<Weapon[]>([]);

  /**
   * Available weapons
   */
  readonly weapons$ = this.weaponsSubject.asObservable();

  constructor() {
    const weaponRules: WeaponRules = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };
    this._engine = new StandardMatchEngine(weaponRules);
    this._gameInstance = new StandardGame(this._engine);
    this.weaponsSubject.next(this._gameInstance.getWeaponList());
  }

  pickMode(mode: string) {
    this._gameInstance.pickMode(mode);
    this.gameModeSubject.next(mode);
  }

  playMatchAgainstAI(weapon: Weapon) {
    const totalWeapons = this.weaponsSubject.value.length;

    // TODO: Refactor business logic outside of the application to inner / core layers
    const randomWeaponIndex = Math.floor(Math.random() * totalWeapons);
    const randomWeapon = this._gameInstance.getWeaponList()[randomWeaponIndex];
    const turn: GameTurn = {
      playerMoves: [
        { player: { id: 'player1' }, weapon: weapon },
        { player: { id: 'player2' }, weapon: randomWeapon },
      ],
    };
    const outcome = this._gameInstance.evaluateMatch(turn);
    if (outcome.type === 'winning' && outcome.winningPlayer) {
      // TODO: Create types to avoid type casting
      const winner = outcome.winningPlayer as 'player1' | 'player2';
      const scores = this.scoresSubject.value;
      const newScores: GameService['scoresSubject']['value'] = {
        ...scores,
        [winner]: ++scores[winner],
      };
      this.scoresSubject.next(newScores);
      this.gameStateSubject.next(`${winner}-win`);
    } else {
      this.gameStateSubject.next('draw');
    }

    return outcome;
  }
}
