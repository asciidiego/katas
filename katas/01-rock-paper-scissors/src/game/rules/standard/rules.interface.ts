/**
 * Game-related rules interface module
 */

/**
 * Rules that assign which weapon wins against which other weapon
 */
export interface WeaponRules {
    /**
     * Denotes which weapon beats which other weapon
     *
     * @example
     * {rock: ["scissors"]}  // weapon with ID "rock" beats weapon with ID "scissors"
     */
    [weaponIdentifier: string]: string[];
}