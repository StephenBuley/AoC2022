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
