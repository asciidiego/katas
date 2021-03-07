import { GameTurn } from "./game-turn.interface";
import { Game, GameOutcome } from "./game.interface";
import { MatchEngine } from "./match-engine.interface";
import { Player } from "./player.interface";

/**
 * Concrete implementation of a standard rock-paper-scissors game.
 */
export class StandardGame implements Game {
  constructor(private engine: MatchEngine) {}
  evaluateMatch(gameTurn: GameTurn): GameOutcome {
    // IDEA: more than two players?
    const [p1, p2] = gameTurn.playerMoves;
    const { weapon: weapon1 } = p1;
    const { weapon: weapon2 } = p2;

    if (weapon1.id === weapon2.id) {
      return {
        type: "draw",
      };
    }

    const winnerWeapon = this.engine.evaluateWeapons(p1.weapon, p2.weapon);
    if (winnerWeapon === p1.weapon.id)
      return { type: "winning", winningPlayer: p1.player.id };
    else
      return {
        type: "winning",
        winningPlayer: p2.player.id,
      };
  }
}
