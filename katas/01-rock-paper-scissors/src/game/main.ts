import { WeaponRules } from "./rules.interface";
import { StandardGame } from "./standard-game";
import { StandardMatchEngine } from "./standard-match";

const weaponRules: WeaponRules = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};
const engine = new StandardMatchEngine(weaponRules);
const game = new StandardGame(engine);
