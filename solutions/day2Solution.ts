import { getInputFromFile } from '../utils/getInputFromFile'

const points = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
}
const games: string[] = [] // ['A X']

try {
  const response = getInputFromFile('./inputfiles/day2Input.txt')
  if (response instanceof Error) {
  } else {
    games.push(...response)
  }
} catch (e) {
  console.error(e)
}

type Game = ['A' | 'B' | 'C', 'X' | 'Y' | 'X']

export function calculateFinalScore() {
  let total = 0

  for (const game of games) {
    const [opp, self]: Game = game.split(' ') as Game
    total += determineScore(opp, self) + points[self as 'X' | 'Y' | 'Z']
  }

  return total
}

export function calculateFinalScoreFromGameResults() {
  let total = 0

  for (const game of games) {
    const [opp, result] = game.split(' ') as Game
    const self = getChoiceFromResult(opp, result)
    total += determineScore(opp, self) + points[self]
  }

  return total
}

function getChoiceFromResult(opp: 'A' | 'B' | 'C', result: 'X' | 'Y' | 'Z') {
  if (result === 'X') {
    // I need to lose
    if (opp === 'A') {
      // opponent chose Rock
      return 'Z'
    } else if (opp === 'B') {
      // opponent chose Paper
      return 'X'
    } else {
      // opponent chose Scissors
      return 'Y'
    }
  } else if (result === 'Y') {
    // I need to draw
    if (opp === 'A') {
      // opponent chose Rock
      return 'X'
    } else if (opp === 'B') {
      // opponent chose Paper
      return 'Y'
    } else {
      // opponent chose Scissors
      return 'Z'
    }
  } else {
    // I need to win
    if (opp === 'A') {
      // opponent chose Rock
      return 'Y'
    } else if (opp === 'B') {
      // opponent chose Paper
      return 'Z'
    } else {
      // opponent chose Scissors
      return 'X'
    }
  }
}

function determineScore(player1: string, player2: string) {
  if (player1 === 'A') {
    // opponent chose Rock
    if (player2 === 'X') {
      // I also chose Rock
      return 3
    } else if (player2 === 'Y') {
      // I chose Paper
      return 6
    } else {
      // I chose scissors
      return 0
    }
  } else if (player1 === 'B') {
    // opponenet chose paper
    if (player2 === 'X') {
      // I chose Rock
      return 0
    } else if (player2 === 'Y') {
      // I chose Paper
      return 3
    } else {
      // I chose Scissors
      return 6
    }
  } else {
    // opponent chose Scissors
    if (player2 === 'X') {
      // I chose Rock
      return 6
    } else if (player2 === 'Y') {
      // I chose paper
      return 0
    } else {
      // I chose scissors
      return 3
    }
  }
}
