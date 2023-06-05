import { getInputFromFile } from '../utils/getInputFromFile'

const groups: string[] = [] // []

try {
  const response = getInputFromFile('./inputfiles/day4Input.txt')
  if (response instanceof Error) {
  } else {
    groups.push(...response)
  }
} catch (e) {
  console.error(e)
}

export function findCompleteOverlaps() {
  let total = 0
  for (const group of groups) {
    const [assignment1, assignment2] = group.split(',')
    const [start1, end1] = assignment1.split('-').map(Number)
    const [start2, end2] = assignment2.split('-').map(Number)
    if (
      (start1 <= start2 && end1 >= end2) ||
      (start2 <= start1 && end2 >= end1)
    ) {
      total++
    }
  }
  return total
}
