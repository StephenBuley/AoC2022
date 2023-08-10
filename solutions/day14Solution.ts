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
  const grid: Point[] = []
  for (let i = 490; i < 510; i++) {
    for (let j = 0; j < 15; j++) {
      grid.push(new Point(i, j))
    }
  }
  for (const row of rows) {
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
  console.log(grid.filter((val) => val.blocked))
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