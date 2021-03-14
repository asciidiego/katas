import { Weapon, WeaponDisplayMap, WeaponRules } from '@game';

export const StandardWeaponRules: WeaponRules = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock'],
};

export const StandardWeaponDisplayMap: WeaponDisplayMap = {
  rock: 'Rock 🗿',
  paper: 'Paper 📄',
  scissors: 'Scissors ✂️',
  lizard: 'Lizard 🦎',
  spock: 'Spock 🖖',
};
