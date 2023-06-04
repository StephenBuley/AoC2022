import { getInputFromFile } from '../utils/getInputFromFile'

export function calculateFinalScore() {
  const points = {
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
  let total = 0

  for (const game of games) {
    const [opp, self] = game.split(' ')
    total += determineScore(opp, self) + points[self as 'X' | 'Y' | 'Z']
  }

  return total
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
    // opponenet chose Paper
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
