import { Injectable } from '@angular/core';
import {
  Game,
  GameTurn,
  getRandomWeapon,
  MatchEngine,
  StandardGame,
  StandardMatchEngine,
  Weapon,
  WeaponRules,
} from '@game';
import { BehaviorSubject, of } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { FeatureFlagConfigurationService } from './config/feature-flags.service';

/**
 * @todo develop / refactor scoring system in core (i.e. `@game`)
 */
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
  /**
   * Reflects current state of the game. It can be one of
   * 
   *   - ready
   *   - draw
   *   - player1-win
   *   - player2-win
   *   - Weapon (label) vs Weapon (label) ex-> "rock vs rock"
   */
  private readonly gameStateSubject = new BehaviorSubject('ready');

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

  tearDown() {
    this.gameStateSubject.next('ready');
    this.scoresSubject.next({ player1: 0, player2: 0 });
  }

  constructor(
    private readonly configurationService: FeatureFlagConfigurationService
  ) {
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

  spectateMatch() {
    const p1Weapon = getRandomWeapon(this._gameInstance);
    return this.playMatchAgainstAI(p1Weapon);
  }

  playMatchAgainstAI(weapon: Weapon) {
    const _delay = 500;

    // quick/drafty animation simulator!

    // The presentational logic could be done in presenter, in a core animation
    // layer or in the component itself. TODO: Feature flag for animation This
    // can be refactored into a presentational stateless function that generates
    // RxJS operators given a text input such as
    //
    // ['rock', 'paper', {delay: 2000, value: 'Scissors!'}]
    //
    // But for the demonstration, this should be enough. Not because of
    // laziness, but because at the start of a project it makes sense to follow
    // the Single Responsibility Principle and the Common Closure Principle
    // (component level). As the project matures, we can start to reuse logic as
    // we know more about our business domain.

    /**
     * This is where a mouse event can become useful!
     *
     * @see `fromEvent` from RxJS.
     */
    const dummyEvent = 1;
    // TODO: animation feature flag
    const isAnimated = this.configurationService.get('ANIMATION_ENABLED');
    console.log(isAnimated);
    const event$ = of(dummyEvent).pipe(delay(_delay));
    const intro$ = isAnimated
      ? event$.pipe(
          tap(() => this.gameStateSubject.next('rock')),
          delay(_delay),
          tap(() => this.gameStateSubject.next('paper')),
          delay(_delay),
          tap(() => this.gameStateSubject.next('scissors')),
          delay(_delay),
          tap(() => this.gameStateSubject.next('3')),
          delay(_delay),
          tap(() => this.gameStateSubject.next('2')),
          delay(_delay),
          tap(() => this.gameStateSubject.next('1')),
          delay(_delay),
          tap(() => this.gameStateSubject.next('go!')),
          delay(_delay)
        )
      : event$;

    return intro$.pipe(
      map(() => {
        const randomWeapon = getRandomWeapon(this._gameInstance);
        const turn: GameTurn = {
          playerMoves: [
            { player: { id: 'player1' }, weapon: weapon },
            { player: { id: 'player2' }, weapon: randomWeapon },
          ],
        };
        return { turn, weapon: randomWeapon };
      }),
      map((gameData) => ({
        ...gameData,
        outcome: this._gameInstance.evaluateMatch(gameData.turn),
      })),
      tap(({ turn }) =>
        this.gameStateSubject.next(
          `${turn.playerMoves[0].weapon.label} vs ${turn.playerMoves[1].weapon.label}`
        )
      ),
      delay(2000),
      tap(({ outcome }) => {
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
      }),
      delay(2000),
      tap(() => this.gameStateSubject.next('ready'))
    );
  }
}
