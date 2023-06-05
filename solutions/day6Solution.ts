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

export function findMarker() {
  let foundIndex = 0
  for (let i = 3; i < input.length; i++) {
    const found: Record<string, number> = {}
    for (let j = i - 3; j <= i; j++) {
      if (!found[input[j]]) {
        found[input[j]] = 1
      }
    }
    if (Object.entries(found).length == 4) {
      console.log(found)
      foundIndex = i + 1
      break
    }
  }
  return foundIndex
}
