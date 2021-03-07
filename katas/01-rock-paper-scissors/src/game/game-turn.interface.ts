import { GameMove } from "./game-move.interface";

/**
 * A group of player and their designated weapons for the next game turn.
 */
export interface GameTurn {
    /**
     * A collection of player moves
     */
    playerMoves: GameMove[];
}