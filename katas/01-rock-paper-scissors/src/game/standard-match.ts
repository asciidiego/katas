import { MatchEngine } from "./match-engine.interface";
import { WeaponRules } from "./rules.interface";
import { Weapon } from "./weapon.interface";

export class StandardMatchEngine implements MatchEngine {
  constructor(
    private readonly weaponRules: WeaponRules,
    private logger: Logger = new SuperSimpleLogger()
  ) {}
  /**
   * Return the ID of the winning weapon in a two-way battle
   *
   * @param weapon1 weapon object
   * @param weapon2 weapon object
   */
  evaluateWeapons({ id: w1 }: Weapon, { id: w2 }: Weapon): Weapon["id"] {
    this.logger.log(`Evaluating match. W1 -> ${w1}; W2 -> ${w2}`);
    
    const winner = this.weaponRules[w1] === w2 ? w1 : w2;
    
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
