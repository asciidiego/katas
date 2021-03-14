import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Weapon } from '@game';
import { combineLatest, interval, Observable, Subscription, zip } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { FeatureFlagConfigurationService } from '../config/feature-flags.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnDestroy, OnInit {
  // These can come from a Presenter object (again, Angular agnostic :-) )
  weapons$;
  gameState$: Observable<string>;
  scores$;

  shouldDisplayWeaponChooser$: Observable<boolean>;

  private _spectatorSubscription!: Subscription;

  constructor(
    public configurationService: FeatureFlagConfigurationService,
    private gameService: GameService,
    private route: ActivatedRoute
  ) {
    this.weapons$ = this.gameService.weapons$;
    this.gameState$ = this.gameService.state$;
    this.scores$ = this.gameService.scores$;
    this.shouldDisplayWeaponChooser$ = this.route.queryParams.pipe(
      map(({ mode }) => mode === 'pvc')
    );
  }

  ngOnInit() {
    /**
     * Trigger a match request each second. But only if the earlier game finished.
     */
    const intervalicPlay = zip(interval(1000), this.gameState$);
    /**
     * This only emits if the mode is AI vs AI
     */
    const autoPlayIfSpectateModeIsOn$ = this.route.queryParams.pipe(
      filter(({ mode }) => mode === 'cvc')
    );
    this._spectatorSubscription = combineLatest([
      autoPlayIfSpectateModeIsOn$,
      intervalicPlay,
    ])
      .pipe(
        map(([_queryParams, [_interval, gameState]]) => gameState),
        filter((state) => state === 'ready'),
        mergeMap(() => this.gameService.spectateMatch())
      )
      .subscribe();
  }

  /**
   * Plays a match using the selected weapon
   *
   * @param weapon main player picked weapon
   */
  play(weapon: Weapon) {
    // A great idea for refactoring is using functional reactive programming.
    // Using rxjs helpers such as fromEvent, we can create a functional-approach
    // to the UI. If necessary, this can be empowered by using the Redux pattern
    // with something as NgRx or @ngrx/data (the library by john papa).
    this.gameService.playMatchAgainstAI(weapon).subscribe(({ outcome }) => {
      console.log(outcome);
    });
  }

  /**
   * Prefixed method. Intended for development / user configuration.
   *
   * @internal
   */
  _toggleAnimations() {
    this.configurationService.set(
      'ANIMATION_ENABLED',
      !this.configurationService.get('ANIMATION_ENABLED')
    );
  }

  _areAnimationsEnabled$() {
    return this.configurationService.get$('ANIMATION_ENABLED');
  }

  ngOnDestroy() {
    console.log('Destroying battlefield...');
    this.gameService.tearDown();
    this._spectatorSubscription.unsubscribe();
  }
}
