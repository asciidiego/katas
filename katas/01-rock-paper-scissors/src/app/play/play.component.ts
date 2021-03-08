import { Component, OnInit } from '@angular/core';
import { Weapon } from '@game';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GameService } from '../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  weapons$: Observable<Weapon[]>;
  gameState$;
  // TODO: Can be refactored into presenter object
  scores$: Observable<{ player1: string; player2: string }>;

  constructor(private gameService: GameService) {
    // TODO: Refactor into presenter to be able to change weapon display names
    this.weapons$ = this.gameService.weapons$.pipe();
    this.gameState$ = this.gameService.state$;
    this.scores$ = this.gameService.scores$.pipe(
      map(({ player1: p1Score, player2: p2Score }) => ({
        player1: p1Score.toString(),
        player2: p2Score.toString(),
      }))
    );
  }

  play(weapon: Weapon) {
    const outcome = this.gameService.playMatchAgainstAI(weapon);
    console.log(outcome);
  }

  ngOnInit(): void {}
}

const weaponViewModelMap: Record<string, string> = {
  scissors: 'Scissors ✂️',
  rock: 'Rock 🗿',
  paper: 'Paper 📄',
};
