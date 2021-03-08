import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) {}
  pickMode = (mode: string) => this.gameService.pickMode(mode);
  ngOnInit(): void {
    this.gameService.mode$.subscribe((mode) => {
      this.router.navigate(['player-vs-computer'], {
        queryParams: { mode },
      });
    });
  }
}
