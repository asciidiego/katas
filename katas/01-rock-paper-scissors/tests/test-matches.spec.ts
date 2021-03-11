import {
  Game,
  GameMove,
  GameTurn,
  Logger,
  MatchEngine,
  Player,
  StandardGame,
  StandardMatchEngine,
} from '@game';

const weaponRules = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};
const nullLogger: Logger = { log: () => 0 };
const matchEngine: MatchEngine = new StandardMatchEngine(
  weaponRules,
  nullLogger
);

let game: Game;
let p1: Player;
let p2: Player;
beforeAll(() => {
  game = new StandardGame(matchEngine);
  p1 = createPlayer('player1');
  p2 = createPlayer('player2');
});

const createPlayer = (id: string): Player => ({ id });
const createMove = (playerID: string, weaponID: string): GameMove => ({
  player: { id: playerID },
  weapon: { id: weaponID, label: '' },
});

it('should return that rock beats scissors', () => {
  const p1Move = createMove(p1.id, 'rock');
  const p2Move = createMove(p2.id, 'scissors');
  const turn: GameTurn = {
    playerMoves: [p1Move, p2Move],
  };

  const outcome = game.evaluateMatch(turn);

  expect(outcome.type).toBe('winning');
  expect(outcome.winningPlayer).toBe(p1.id);
});

it('should return that scissors beats paper', () => {
  const p1 = createPlayer('player1');
  const p2 = createPlayer('player2');
  const p1Move = createMove(p1.id, 'paper');
  const p2Move = createMove(p2.id, 'scissors');
  const turn: GameTurn = {
    playerMoves: [p1Move, p2Move],
  };

  const outcome = game.evaluateMatch(turn);

  expect(outcome.type).toBe('winning');
  expect(outcome.winningPlayer).toBe(p2.id);
});

it('should return that paper beats rock', () => {
  const p1 = createPlayer('player1');
  const p2 = createPlayer('player2');
  const p1Move = createMove(p1.id, 'paper');
  const p2Move = createMove(p2.id, 'rock');
  const turn: GameTurn = {
    playerMoves: [p1Move, p2Move],
  };

  const outcome = game.evaluateMatch(turn);

  expect(outcome.type).toBe('winning');
  expect(outcome.winningPlayer).toBe(p1.id);
});

it('should return a draw', () => {
  const p1 = createPlayer('player1');
  const p2 = createPlayer('player2');
  const p1Move = createMove(p1.id, 'paper');
  const p2Move = createMove(p2.id, 'paper');
  const turn: GameTurn = {
    playerMoves: [p1Move, p2Move],
  };

  const outcome = game.evaluateMatch(turn);

  expect(outcome.type).toBe('draw');
});

describe('smoke tests', () => {
  it('should create a new game', () => {
    const gameInstance = new StandardGame(matchEngine);
    expect(gameInstance).toBeTruthy();
  });
});
