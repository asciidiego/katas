import { GameTurn } from "./game-turn.interface";
import { Player } from "./player.interface";

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
}

export interface GameOutcome {
  type: "winning" | "draw";
  winningPlayer?: Player["id"];
}
