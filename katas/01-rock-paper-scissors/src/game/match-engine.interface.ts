import { Weapon } from "./weapon.interface";

/**
 * Game engine
 */
export interface MatchEngine {
    /**
     * Return the identifier of the winning weapon in a two-way match.
     */
    evaluateWeapons(weapon1: Weapon, weapon2: Weapon): Weapon['id'];
}