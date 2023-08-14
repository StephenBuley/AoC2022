import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day15ExampleInput.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    for (const line of lines) {
      rows.push(line)
    }
  }
} catch (error) {
  console.error(error)
}

export function determineBeaconPlacement() {
  console.log(rows)
}
