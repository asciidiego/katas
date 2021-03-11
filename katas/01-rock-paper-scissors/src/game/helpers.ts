import { Game } from './game.interface';
import { Weapon } from './weapon.interface';

/**
 * Return random weapon from a game instance.
 */
export function getRandomWeapon(game: Game): Weapon {
  const gameWeapons = game.getWeaponList();
  const randomWeaponIndex = Math.floor(Math.random() * gameWeapons.length);
  const randomWeapon = game.getWeaponList()[randomWeaponIndex];
  return randomWeapon;
}
