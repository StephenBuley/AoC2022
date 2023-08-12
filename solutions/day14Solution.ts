import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day14Input.txt')

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

class Point {
  x: number
  y: number
  blocked: boolean = false
  isSand: boolean = false

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export function simulateTurnsOfSand() {
  const grid: Point[] = generateGrid(300, 0, 700, 200)
  for (const row of rows) {
    // parse the row and generate the corresponding rock formation
    parseRow(row, grid)
  }
  let sandX = 500
  let sandY = 0
  let sandInAbyss = false
  while (!sandInAbyss) {
    if (downIsBlocked(sandX, sandY, grid) === undefined) {
      sandInAbyss = true
    } else if (!downIsBlocked(sandX, sandY, grid)) {
      sandY += 1
    } else if (!downLeftIsBlocked(sandX, sandY, grid)) {
      sandX -= 1
      sandY += 1
    } else if (!downRightIsBlocked(sandX, sandY, grid)) {
      sandX += 1
      sandY += 1
    } else {
      // sand comes to rest
      const thisPoint = grid.find(
        (point) => point.x === sandX && point.y === sandY,
      )!
      thisPoint.isSand = true
      thisPoint.blocked = true
      sandX = 500
      sandY = 0
    }
  }
  return grid.filter((point) => point.isSand).length
}

function downIsBlocked(sandX: number, sandY: number, grid: Point[]) {
  const nextPoint = grid.find(
    (point) => point.x === sandX && point.y === sandY + 1,
  )
  return nextPoint?.blocked
}

function downLeftIsBlocked(sandX: number, sandY: number, grid: Point[]) {
  const nextPoint = grid.find(
    (point) => point.x === sandX - 1 && point.y === sandY + 1,
  )
  return nextPoint?.blocked
}

function downRightIsBlocked(sandX: number, sandY: number, grid: Point[]) {
  const nextPoint = grid.find(
    (point) => point.x === sandX + 1 && point.y === sandY + 1,
  )
  return nextPoint?.blocked
}

function parseRow(row: string, grid: Point[]) {
  const points = row.split(' -> ').map((str) => str.split(',').map(Number))
  let currX = points[0][0]
  let currY = points[0][1]
  for (let i = 1; i < points.length; i++) {
    const nextX = points[i][0]
    const nextY = points[i][1]
    if (currX === nextX) {
      // Y is changing, so X will stay the same throughout
      // loop through every point from points[currX][currY] to points[nextX][nextY] and change them to blocked
      blockRocks('y', currY, nextY, currX, grid)
    } else {
      // X is changing, so Y will stay the same throughout
      blockRocks('x', currX, nextX, currY, grid)
    }
    currX = nextX
    currY = nextY
  }
}

function generateGrid(x1: number, y1: number, x2: number, y2: number) {
  const grid: Point[] = []
  for (let i = x1; i < x2; i++) {
    for (let j = y1; j < y2; j++) {
      grid.push(new Point(i, j))
    }
  }
  return grid
}

function blockRocks(
  axisOfChange: 'x' | 'y',
  changingAxis1: number,
  changingAxis2: number,
  nonChangingAxis1: number,
  grid: Point[],
) {
  for (
    let i = Math.min(changingAxis1, changingAxis2);
    i <= Math.max(changingAxis1, changingAxis2);
    i++
  ) {
    if (axisOfChange === 'x') {
      const pointToChange = findPoint(i, nonChangingAxis1, grid)
      pointToChange.blocked = true
    } else {
      const pointToChange = findPoint(nonChangingAxis1, i, grid)
      pointToChange.blocked = true
    }
  }
}

function findPoint(currX: number, currY: number, grid: Point[]): Point {
  return grid.find((point) => point.x === currX && point.y === currY)!
}

/* 
we have a 2d grid of some height and width
parse the rock formations
  take each set of instructions
    each instruction denotes a set of blocked spaces in our grid
once we have all of our empty and blocked spaces in our grid
  simple while loop until the sand starts falling off (i.e. doesn't come to rest)
    through each time of the loop, follow the instructions for the piece of sand that is falling
*/
