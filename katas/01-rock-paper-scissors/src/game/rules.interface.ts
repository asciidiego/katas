/**
 * Game-related rules interface module
 */

/**
 * Main game rules
 */
export interface GameRules {
    /**
     * weapon game rules
     */
    weaponRules: WeaponRules;
}

/**
 * Rules that assign which weapon wins against which other weapon
 */
export interface WeaponRules {
    /**
     * Denotes which weapon beats which other weapon
     *
     * @example
     * {rock: "scissors"}  // weapon with ID "rock" beats weapon with ID "scissors"
     */
    [weaponIdentifier: string]: string;
}