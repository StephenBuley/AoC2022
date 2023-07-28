import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day8ExampleInput.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    rows.push(...lines)
  }
} catch (error) {
  console.error(error)
}

class Tree {
  visibleFromNorth: boolean = false
  visibleFromSouth: boolean = false
  visibleFromEast: boolean = false
  visibleFromWest: boolean = false
  posX: number
  posY: number
  height: number
  constructor(height: number, positionX: number, positionY: number) {
    this.posX = positionX
    this.posY = positionY
    this.height = height
  }
}

export function numVisibleTrees() {
  const outsideCount = countOutsideTrees(rows[0].length, rows.length)
  const trees: Tree[] = generateForest(rows)
}

function generateForest(input: string[]) {
  const trees: Tree[] = []

  // look through each row
  for (let i = 0; i < input.length; i++) {
    // look through each column in each row
    for (let j = 0; j < input[i].length; j++) {
      trees.push(new Tree(parseInt(input[i][j]), j, i))
    }
  }

  return trees
}

function countOutsideTrees(width: number, height: number) {
  return width * 2 + height * 2 - 4
}

/* 

each outside tree can be counted automatically

for each of the inside trees, we need to go through each one and decide if it can be seen from any side

what is the algorithm.....?

for each tree {
  check north
  check east
  check south
  check west
}

*/
