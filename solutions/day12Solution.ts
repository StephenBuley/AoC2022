import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day12ExampleInput.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    rows.push(...lines)
  }
} catch (error) {
  console.error(error)
}

class Node {
  x: number
  y: number
  isStart: boolean
  isEnd: boolean
  height: number
  distance: number = Infinity
  visited: boolean = false

  constructor(
    x: number,
    y: number,
    height: number,
    isStart: boolean,
    isEnd: boolean,
  ) {
    this.x = x
    this.y = y
    this.height = height
    this.isStart = isStart
    this.isEnd = isEnd
  }
}

export function findShortestDistance() {
  // set up
  const unvisited: Node[] = []
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      const newNode = generateNewNode(i, j)
      unvisited.push(newNode)
    }
  }
  const startNode = unvisited.find((node) => node.isStart)!
  const endNode = unvisited.find((node) => node.isEnd)!
  startNode.distance = 0
  /* 
  while (endNode.visited === false) {
    unvisited.sort((a, b) => a.distance - b.distance)
    const currentNode = unvisited[0]
    
    for (all nodes connected to current node) {
      if (nodeToCheck.height <= currentNode.height + 1) {
        // we can go to this node, calculate distance
        const newDistance = currentNode.distance + 1
        nodeToCheck.distance = Math.min(newDistance, nodeToCheck.distance)
      }

    }
    // after all connected nodes have been checked
    currentNode.visted = true
    delete currentNode from unvisited
    
  
  }

  return endNode.distance
  */

  console.log(startNode)
  console.log(endNode)
}

// HELPER FUNCTIONS

function generateNewNode(i: number, j: number) {
  const char = rows[i][j]
  const height = getHeight(char)
  const [isStart, isEnd] = isStartOrEnd(char)
  return new Node(j, i, height, isStart, isEnd)
}

function isStartOrEnd(char: string) {
  let isStart = false
  let isEnd = false
  if (char === 'S') isStart = true
  if (char === 'E') isEnd = true
  return [isStart, isEnd]
}

function getHeight(char: string) {
  let height
  if (char !== 'S' && char !== 'E') {
    height = char.charCodeAt(0)
  } else if (char === 'S') {
    height = 'a'.charCodeAt(0)
  } else {
    height = 'z'.charCodeAt(0)
  }
  return height
}
