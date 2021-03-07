import { Player } from "./player.interface";
import { Weapon } from "./weapon.interface";

export interface GameMove {
    player: Player;
    weapon: Weapon;
}