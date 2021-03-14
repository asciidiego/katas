import { WEAPON_DISPLAY_MAP } from 'src/app/standard.rules';
import { MatchEngine } from './match-engine.interface';
import { WeaponRules } from './rules.interface';
import { Weapon } from './weapon.interface';

export class StandardMatchEngine implements MatchEngine {
  weapons: Weapon[] = [];
  constructor(
    private readonly weaponRules: WeaponRules,
    private logger: Logger = new SuperSimpleLogger()
  ) {
    const presentWeapon = (weaponId: string): string =>
      WEAPON_DISPLAY_MAP[weaponId] || weaponId;

    this.weapons = Object.keys(weaponRules).map(
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
