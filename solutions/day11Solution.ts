import { getInputFromFile } from '../utils/getInputFromFile'

const instructions: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day11Input.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    instructions.push(...lines)
  }
} catch (error) {
  console.error(error)
}

export function determineMonkeyBusiness() {
  console.log(instructions)
}
