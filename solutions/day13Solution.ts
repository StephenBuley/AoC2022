import { getInputFromFile } from '../utils/getInputFromFile'

type Packet = number | (number | Packet)[]

type Result = 'correct' | 'incorrect' | 'next'

const input: Packet[] = []

try {
  const lines = getInputFromFile('./inputfiles/day13ExampleInput.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    // parse packets
    for (const line of lines) {
      input.push(line === '' ? [] : (JSON.parse(line) as Packet))
    }
  }
} catch (error) {
  console.error(error)
}

export function sumCorrectlySentPacketIndices() {
  const newInput = structuredClone(input)
  const results: Result[] = []
  while (newInput.length > 0) {
    const left = newInput.shift()!
    const right = newInput.shift()!

    newInput.shift() // get rid of empty array line
    results.push(compare(left, right))
  }
  return results.reduce(
    // sum up indicies that are correct
    (acc, val, i) => (val === 'correct' ? acc + i + 1 : acc + 0),
    0,
  )
}

export function findDecoderKey() {
  const newInput = structuredClone(input)
  newInput.sort((a, b) => {
    const result = compare(a, b)
    if (result === 'correct') return -1
    else return 1
  })
  // this doesn't work because I am mutating everything... wop wop wahhhhh ok I'll come back later
  console.log(newInput)
}

function compare(left: Packet, right: Packet): Result {
  let result: Result = 'next'
  if (typeof left === 'number' && typeof right === 'number') {
    result = compareTwoIntegers(left, right)
  } else if (typeof left === 'object' && typeof right === 'object') {
    result = compareTwoLists(left, right)
  } else if (typeof left === 'number' && typeof right === 'object') {
    result = compareTwoLists([left], right)
  } else if (typeof left === 'object' && typeof right === 'number') {
    result = compareTwoLists(left, [right])
  }
  return result
}

function compareTwoIntegers(left: number, right: number): Result {
  if (left < right) {
    return 'correct'
  } else if (right < left) {
    return 'incorrect'
  } else {
    return 'next'
  }
}

function compareTwoLists(left: Packet[], right: Packet[]): Result {
  let result: Result = 'next'
  while (left.length > 0 && right.length > 0 && result === 'next') {
    const leftChild = left.shift()!
    const rightChild = right.shift()!
    result = compare(leftChild, rightChild)
  }
  if (result === 'next') {
    if (left.length === 0 && right.length > 0) {
      return 'correct'
    } else if (right.length === 0 && left.length > 0) {
      return 'incorrect'
    } else {
      return result
    }
  } else {
    return result
  }
}
