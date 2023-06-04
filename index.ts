import { getInputFromFile } from './utils/getInputFromFile'
import { totalFromArray } from './utils/totalFromArray'
const lines: string[] = []
try {
  const response = getInputFromFile('./day1Input.txt')
  if (response instanceof Error) {
  } else {
    lines.push(...response)
  }
} catch (e) {
  console.error(e)
}
const elves: string[][] = []
let cache: string[] = []
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  if (line === '') {
    elves.push(cache)
    cache = []
  } else {
    cache.push(line)
  }
  if (i == lines.length - 1) {
    elves.push(cache)
  }
}

function findHighestCalorieTotal() {
  let highest = 0
  for (const elf of elves) {
    const total = totalFromArray(elf)
    if (total > highest) {
      highest = total
    }
  }
  return highest
}

function findHighestThreeCalorieTotal() {
  const sorted = [
    totalFromArray(elves[0]),
    totalFromArray(elves[1]),
    totalFromArray(elves[2]),
  ]
  sorted.sort()
  let highest = sorted[2]
  let secondHighest = sorted[1]
  let thirdHighest = sorted[0]
  let total = 0
  for (let i = 3; i < elves.length; i++) {
    const elf = elves[i]
    const total = totalFromArray(elf)
    if (total > highest) {
      thirdHighest = secondHighest
      secondHighest = highest
      highest = total
    } else if (total > secondHighest) {
      thirdHighest = secondHighest
      secondHighest = total
    } else if (total > thirdHighest) {
      thirdHighest = total
    }
  }
  total = highest + secondHighest + thirdHighest
  return total
}

console.log(findHighestCalorieTotal())
console.log(findHighestThreeCalorieTotal())
