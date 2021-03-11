import { Component, OnInit } from '@angular/core';
import { Weapon } from '@game';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FeatureFlagConfigurationService } from '../config/feature-flags.service';
import { GameService } from '../game.service';

const logGameState = (state: unknown) => console.log('state update ->', state);

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
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
}

const weaponViewModelMap: Record<string, string> = {
  scissors: 'Scissors ✂️',
  rock: 'Rock 🗿',
  paper: 'Paper 📄',
};
