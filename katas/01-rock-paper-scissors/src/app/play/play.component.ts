import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Weapon } from '@game';
import { interval, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { FeatureFlagConfigurationService } from '../config/feature-flags.service';
import { GameService } from '../game.service';

const logGameState = (state: unknown) => console.log('state update ->', state);

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

  constructor(
    public configurationService: FeatureFlagConfigurationService,
    private gameService: GameService
  ) {
    // TODO: Refactor into presenter to easily change presentation logic
    //         - Can be enhanced with Angular Pipes
    this.weapons$ = this.gameService.weapons$;
    this.gameState$ = this.gameService.state$.pipe(
      tap(logGameState)
    ) as Observable<string>;
    this.scores$ = this.gameService.scores$;
  }

  /**
   * Plays a match using the selected weapon
   *
   * @param weapon main player picked weapon
   */
  play(weapon: Weapon) {
    // TODO: change behavior depending on route param (AI vs AI mode)
    // const w: Weapon = {id: 'rock', label: 'piedra'};
    // interval(1000).pipe(
    //   mergeMap(i => this.gameService.playMatchAgainstAI(weapon))
    // ).subscribe();

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
  }
}

const weaponViewModelMap: Record<string, string> = {
  scissors: 'Scissors ✂️',
  rock: 'Rock 🗿',
  paper: 'Paper 📄',
};
