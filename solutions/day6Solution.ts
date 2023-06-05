import { getInputFromFile } from '../utils/getInputFromFile'

let input: string = ''

try {
  const lines = getInputFromFile('./inputfiles/day6Input.txt')

  if (lines instanceof Error) {
  } else {
    input = lines[0]
  }
} catch (error) {
  console.error(error)
}

export function findMarker(markerLength: number) {
  let foundIndex = 0
  for (let i = markerLength - 1; i < input.length; i++) {
    // - 1 is for index off by one
    const found: Record<string, number> = {}
    for (let j = i - (markerLength - 1); j <= i; j++) {
      // off by one again
      if (!found[input[j]]) {
        found[input[j]] = 1
      }
    }
    if (Object.entries(found).length == markerLength) {
      // if the object has the markerLength in it, each one was unique
      foundIndex = i + 1 // fixing our off by one error once more
      break
    }
  }
  return foundIndex
}
