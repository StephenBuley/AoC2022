import { getInputFromFile } from '../utils/getInputFromFile'

const instructions: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day9ExampleInput.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    instructions.push(...lines)
  }
} catch (error) {
  console.error(error)
}

export function findTailPositions() {
  console.log(instructions)
}
