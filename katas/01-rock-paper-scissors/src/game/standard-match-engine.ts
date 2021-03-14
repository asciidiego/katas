import { MatchEngine } from './match-engine.interface';
import {
  StandardWeaponDisplayMap,
  StandardWeaponRules
} from './rules/standard';
import { Weapon } from './weapon.interface';

export class StandardMatchEngine implements MatchEngine {
  weapons: Weapon[] = [];
  private readonly weaponRules = StandardWeaponRules;
  constructor(private logger: Logger = new SuperSimpleLogger()) {
    const presentWeapon = (weaponId: string): string =>
      StandardWeaponDisplayMap[weaponId] || weaponId;

    this.weapons = Object.keys(this.weaponRules).map(
      (weaponKey): Weapon => ({
        id: weaponKey,
        label: presentWeapon(weaponKey),
      })
    );
  }
  /**
   * Return the ID of the winning weapon in a two-way battle
   *
   * @param weapon1 weapon object
   * @param weapon2 weapon object
   */
  evaluateWeapons({ id: w1 }: Weapon, { id: w2 }: Weapon): Weapon['id'] {
    const winner = this.weaponRules[w1].includes(w2) ? w1 : w2;

    this.logger.log(`Evaluating match. W1 -> ${w1}; W2 -> ${w2}`);
    this.logger.log(`Winner weapon -> ${winner}`);

    return winner;
  }
}

/**
 * This is just an experimental but extensible logger interface
 * @internal
 */
export interface Logger {
  log: (message: string) => void;
}

class SuperSimpleLogger implements Logger {
  log = (msg: string) => console.log(`[${Date.now()}] - [DEBUG]:`, msg);
}
