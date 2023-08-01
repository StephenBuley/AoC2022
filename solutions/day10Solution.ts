import { getInputFromFile } from '../utils/getInputFromFile'

const instructions: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day10Input.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    instructions.push(...lines)
  }
} catch (error) {
  console.error(error)
}

export function findSignalStrength() {
  let cycleNum = 0
  let X = 1
  const savedSignalStrengths: number[][] = []
  for (const instruction of instructions) {
    const [operation, value] = parseInstructions(instruction)
    if (operation === 'addx') {
      cycleNum = cycle(cycleNum, savedSignalStrengths, X)
      cycleNum = cycle(cycleNum, savedSignalStrengths, X)
      X += value
    } else {
      cycleNum = cycle(cycleNum, savedSignalStrengths, X)
    }
  }

  return savedSignalStrengths.reduce((acc, val) => {
    return (acc += val[0] * val[1])
  }, 0)
}

export function renderMessage() {
  let cycleNum = 0
  let X = 1
  const savedSignalStrengths: number[][] = []
  const message: string[] = []
  for (const instruction of instructions) {
    const [operation, value] = parseInstructions(instruction)
    if (operation === 'addx') {
      drawPixel(X, cycleNum, message)
      cycleNum = cycle(cycleNum, savedSignalStrengths, X) % 40
      drawPixel(X, cycleNum, message)
      cycleNum = cycle(cycleNum, savedSignalStrengths, X) % 40
      X += value
    } else {
      drawPixel(X, cycleNum, message)
      cycleNum = cycle(cycleNum, savedSignalStrengths, X) % 40
    }
  }
  const fullMessage = []
  fullMessage.push(message.slice(0, 40).join(''))
  fullMessage.push(message.slice(40, 80).join(''))
  fullMessage.push(message.slice(80, 120).join(''))
  fullMessage.push(message.slice(120, 160).join(''))
  fullMessage.push(message.slice(160, 200).join(''))
  fullMessage.push(message.slice(200, 240).join(''))
  return '\n' + fullMessage.join('\n')
}

function drawPixel(X: number, CRT: number, message: string[]) {
  if (CRT === X || CRT === X - 1 || CRT === X + 1) {
    message.push('#')
  } else {
    message.push('.')
  }
}

function cycle(cycleNum: number, savedSignalStrengths: number[][], X: number) {
  cycleNum++

  saveRelevantSignals(cycleNum, savedSignalStrengths, X)
  return cycleNum
}

function saveRelevantSignals(
  cycleNum: number,
  savedSignalStrengths: number[][],
  X: number,
) {
  if ((cycleNum - 20) % 40 === 0) {
    savedSignalStrengths.push([cycleNum, X])
  }
}

function parseInstructions(instruction: string): [string, number] {
  const arr = instruction.split(' ')
  return [arr[0], parseInt(arr[1]) || 0]
}
