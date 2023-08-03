import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day12Input.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    rows.push(...lines)
  }
} catch (error) {
  console.error(error)
}

export function findShortestDistance() {}
