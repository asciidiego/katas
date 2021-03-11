import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Weapon } from '@game';
import {
  combineLatest,
  iif,
  interval,
  merge,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { filter, map, mergeMap, takeWhile, tap } from 'rxjs/operators';
import { FeatureFlagConfigurationService } from '../config/feature-flags.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnDestroy {
  // These can come from a Presenter object (again, Angular agnostic :-) )
  weapons$;
  gameState$: Observable<string>;
  scores$;

  private _spectatorSubscription: Subscription;

  constructor(
    public configurationService: FeatureFlagConfigurationService,
    private gameService: GameService,
    private route: ActivatedRoute
  ) {
    // TODO: Refactor presentation state into presenter to easily change
    //       presentation logic - Can be enhanced with Angular Pipes
    this.weapons$ = this.gameService.weapons$;
    this.gameState$ = this.gameService.state$;
    this.scores$ = this.gameService.scores$;

    /**
     * Plays a match each interval reactively. Only plays if spectator mode is
     * enabled and all the animations have finished.
     */
    const spectatorMode$ = combineLatest([
      interval(1000),
      this.route.queryParams,
      this.gameState$,
    ]).pipe(
      filter(([, { mode }, state]) => mode === 'cvc' && state === 'ready'),
      mergeMap(() => this.gameService.spectateMatch())
    );
    
    // Potential improvement: separate into two play components.
    // As time passes, both components they will evolve for different reasons.
    this._spectatorSubscription = spectatorMode$.subscribe();
  }

  /**
   * Plays a match using the selected weapon
   *
   * @param weapon main player picked weapon
   */
  play(weapon: Weapon) {
    // TODO: change behavior depending on route param (AI vs AI mode)
    // interval(1000)
    //   .pipe(mergeMap((i) => this.gameService.playMatchAgainstAI(weapon)))
    //   .subscribe();

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

const weaponViewModelMap: Record<string, string> = {
  scissors: 'Scissors ✂️',
  rock: 'Rock 🗿',
  paper: 'Paper 📄',
};
