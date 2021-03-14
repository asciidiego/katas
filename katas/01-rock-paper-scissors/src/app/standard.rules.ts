import { Weapon, WeaponDisplayMap, WeaponRules } from '@game';

export const WEAPON_RULES: WeaponRules = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock'],
};

export const WEAPON_DISPLAY_MAP: WeaponDisplayMap = {
  rock: 'Rock 🗿',
  paper: 'Paper 📄',
  scissors: 'Scissors ✂️',
  lizard: 'Lizard 🦎',
  spock: 'Spock 🖖',
};
