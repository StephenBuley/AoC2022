import { getInputFromFile } from '../utils/getInputFromFile'

const instructions: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day9Input.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    instructions.push(...lines)
  }
} catch (error) {
  console.error(error)
}

class Knot {
  x: number = 0
  y: number = 0
  isHead: boolean
  isTail: boolean

  constructor(isHead: boolean, isTail: boolean) {
    this.isHead = isHead
    this.isTail = isTail
  }

  move(dir: Direction) {
    if (dir === 'U') this.y++
    if (dir === 'D') this.y--
    if (dir === 'R') this.x++
    if (dir === 'L') this.x--
  }

  followHead(oldX: number, oldY: number, newX: number, newY: number) {
    if (oldX === this.x && oldY === this.y) return
    if (Math.abs(newX - this.x) <= 1 && Math.abs(newY - this.y) <= 1) return
    if (newX === this.x && newY > this.y) {
      this.move('U')
    } else if (newX === this.x && newY < this.y) {
      this.move('D')
    } else if (newY === this.y && newX > this.x) {
      this.move('R')
    } else if (newY === this.y && newX < this.x) {
      this.move('L')
    } else if (newX > this.x && newY > this.y) {
      this.move('U')
      this.move('R')
    } else if (newX > this.x && newY < this.y) {
      this.move('D')
      this.move('R')
    } else if (newX < this.x && newY < this.y) {
      this.move('D')
      this.move('L')
    } else if (newX < this.x && newY > this.y) {
      this.move('U')
      this.move('L')
    }
  }
}

type Direction = 'U' | 'R' | 'L' | 'D'

export function findTailPositions(numOfKnots: number) {
  const knots: Knot[] = generateKnotsArray(numOfKnots)
  const tracker = ['00']
  for (const instruction of instructions) {
    const [direction, steps] = parseInstructions(instruction)
    simulateKnotMovements(numOfKnots, knots, direction, steps, tracker)
  }
  return tracker.length
}

function simulateKnotMovements(
  numOfKnots: number,
  knots: Knot[],
  direction: Direction,
  steps: number,
  tracker: string[],
) {
  for (let i = 0; i < steps; i++) {
    const head = knots.find((knot) => knot.isHead)!
    const tail = knots.find((knot) => knot.isTail)!
    let oldX = head.x
    let oldY = head.y
    head.move(direction)
    let newX = head.x
    let newY = head.y
    let currentX
    let currentY
    for (let i = 1; i < numOfKnots; i++) {
      const knot = knots[i]
      currentX = knot.x
      currentY = knot.y
      knot.followHead(oldX, oldY, newX, newY)
      oldX = currentX
      oldY = currentY
      newX = knot.x
      newY = knot.y
    }
    const coords = `${tail.x}${tail.y}`
    if (!tracker.includes(coords)) tracker.push(coords)
  }
}

function parseInstructions(instruction: string): [Direction, number] {
  const arr = instruction.split(' ')
  const direction = arr[0] as Direction
  const steps = parseInt(arr[1])
  return [direction, steps]
}

function generateKnotsArray(num: number) {
  const knots: Knot[] = []
  for (let i = 0; i < num; i++) {
    let isHead = false
    let isTail = false
    if (i === 0) isHead = true
    if (i === num - 1) isTail = true

    knots.push(new Knot(isHead, isTail))
  }
  return knots
}
