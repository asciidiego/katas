export interface Weapon {
  /**
   * Weapon identifier
   */
  id: string;
  /**
   * Display label
   */
  label: string;
}

/**
 * Presentation map.
 * 
 * @example
 * {'rock': 'Piedra 🗿'}
 */
export interface WeaponDisplayMap {
  [weapon: string]: string;
}
