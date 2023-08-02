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

class Monkey {
  id: number
  items: number[]
  operation: string
  test: number
  onTrue: number
  onFalse: number
  inspections: number = 0
  constructor(
    id: number,
    items: number[],
    operation: string,
    test: number,
    onTrue: number,
    onFalse: number,
  ) {
    this.id = id
    this.items = items
    this.operation = operation
    this.test = test
    this.onTrue = onTrue
    this.onFalse = onFalse
  }

  inspect(item: number) {
    const type = this.operation.slice(10, 11)
    let second = parseInt(this.operation.slice(12))
    if (isNaN(second)) {
      second = item
    }
    let newItem
    if (type === '*') {
      newItem = multiply(item, second)
    } else {
      newItem = add(item, second)
    }
    this.inspections++
    return beRelievedAbout(newItem)
  }

  throw(item: number, arr: Monkey[]) {
    let nextMonkey: Monkey
    if (item % this.test === 0) {
      nextMonkey = arr.find((monkey) => monkey.id === this.onTrue)!
    } else {
      nextMonkey = arr.find((monkey) => monkey.id === this.onFalse)!
    }
    nextMonkey.items.push(item)
  }
}

export function determineMonkeyBusiness(iterations: number) {
  const monkeys: Monkey[] = parseInstructions()
  let lcm = 1
  for (const monkey of monkeys) {
    lcm *= monkey.test
  }
  for (let i = 0; i < iterations; i++) {
    for (const monkey of monkeys) {
      for (const [i, item] of monkey.items.entries()) {
        monkey.items[i] = monkey.inspect(item) % lcm
      }
      for (let i = 0; i < monkey.items.length; i++) {
        monkey.throw(monkey.items[i], monkeys)
      }
      monkey.items = []
    }
  }
  monkeys.sort((a, b) => b.inspections - a.inspections)
  return monkeys[0].inspections * monkeys[1].inspections
}

function beRelievedAbout(item: number) {
  return Math.floor(item)
}

function parseInstructions() {
  const monkeys: Monkey[] = []
  let id
  let items
  let operation
  let test
  let onTrue
  let onFalse
  for (const line of instructions) {
    if (line.startsWith('Monkey')) {
      id = parseInt(line[7])
    } else if (line.startsWith('  Starting items:')) {
      items = line
        .slice(18)
        .split(', ')
        .map((val) => parseInt(val))
    } else if (line.startsWith('  Operation:')) {
      operation = line.slice(13)
    } else if (line.startsWith('  Test:')) {
      test = parseInt(line.slice(21))
    } else if (line.startsWith('    If true:')) {
      onTrue = parseInt(line.slice(-1))
    } else if (line.startsWith('    If false:')) {
      onFalse = parseInt(line.slice(-1))
    }
    if (
      id !== undefined &&
      items &&
      operation &&
      test &&
      onTrue !== undefined &&
      onFalse !== undefined
    ) {
      // we got ourselves a full monkey
      monkeys.push(new Monkey(id, items, operation, test, onTrue, onFalse))
      id = undefined
      items = undefined
      operation = undefined
      test = undefined
      onTrue = undefined
      onFalse = undefined
    }
  }
  return monkeys
}

function multiply(a: number, b: number) {
  return a * b
}

function add(a: number, b: number) {
  return a + b
}
