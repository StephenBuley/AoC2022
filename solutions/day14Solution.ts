import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day14ExampleInput.txt')

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

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export function simulateTurnsOfSand() {
  const grid: Point[] = generateGrid(490, 0, 510, 15)
  for (const row of rows) {
    // parse the row and generate the corresponding rock formation
    parseRow(row, grid)
  }

  /* 
  sand will be falling from 500, 0
  while (sand not falling into the abyss) {
    while (sand not at rest) {
      check if the sand can move straight down
      check if the sand can move down and to the left
      check if the sand can move down and to the right
      if none of those, sand is now at rest, generate new sand somewhere
    }
  }
  */
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
