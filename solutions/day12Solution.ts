import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day12Input.txt')

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
  neighbors: Node[] = []

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
  const unvisited: Node[] = createNodes()
  for (const node of unvisited) {
    // go through and populate neighbors for each node
    findNeighbors(node, unvisited)
  }
  const startNode = unvisited.find((node) => node.isStart)!
  const endNode = unvisited.find((node) => node.isEnd)!
  return runAlgorithm(unvisited, startNode, endNode)
}

export function findNiceHikingPath() {
  // set up
  const unvisited: Node[] = createNodes()
  for (const node of unvisited) {
    // go through and populate neighbors for each node
    findNeighbors(node, unvisited)
  }
  const startNode = unvisited.find((node) => node.isEnd)!
  const endNode = unvisited.find((node) => node.isStart)!
  startNode.distance = 0
  let currentNode = startNode
  while (endNode.visited === false) {
    for (const nodeToCheck of currentNode.neighbors) {
      if (!nodeToCheck.visited) {
        if (nodeToCheck.height >= currentNode.height - 1) {
          // we can go to this node, calculate distance
          const newDistance = currentNode.distance + 1
          nodeToCheck.distance = Math.min(newDistance, nodeToCheck.distance)
        }
      }
    }
    currentNode.visited = true
    if (currentNode.height === 'a'.charCodeAt(0)) return currentNode.distance
    const deleteIndex = unvisited.indexOf(currentNode)
    unvisited.splice(deleteIndex, 1)
    unvisited.sort((a, b) => a.distance - b.distance)
    currentNode = unvisited[0]
  }
}

// HELPER FUNCTIONS

function runAlgorithm(unvisited: Node[], startNode: Node, endNode: Node) {
  startNode.distance = 0
  let currentNode = startNode
  while (endNode.visited === false) {
    for (const nodeToCheck of currentNode.neighbors) {
      if (!nodeToCheck.visited) {
        if (nodeToCheck.height <= currentNode.height + 1) {
          // we can go to this node, calculate distance
          const newDistance = currentNode.distance + 1
          nodeToCheck.distance = Math.min(newDistance, nodeToCheck.distance)
        }
      }
    }
    currentNode.visited = true
    const deleteIndex = unvisited.indexOf(currentNode)
    unvisited.splice(deleteIndex, 1)
    unvisited.sort((a, b) => a.distance - b.distance)
    currentNode = unvisited[0]
  }

  return endNode.distance
}

function createNodes() {
  const unvisited: Node[] = []
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      const newNode = generateNewNode(i, j)
      unvisited.push(newNode)
    }
  }

  return unvisited
}

function findNeighbors(node: Node, arr: Node[]) {
  const east = arr.find(
    (neighbor) => neighbor.x === node.x + 1 && neighbor.y === node.y,
  )
  const west = arr.find(
    (neighbor) => neighbor.x === node.x - 1 && neighbor.y === node.y,
  )
  const south = arr.find(
    (neighbor) => neighbor.x === node.x && neighbor.y === node.y - 1,
  )
  const north = arr.find(
    (neighbor) => neighbor.x === node.x && neighbor.y === node.y + 1,
  )
  east && node.neighbors.push(east)
  west && node.neighbors.push(west)
  south && node.neighbors.push(south)
  north && node.neighbors.push(north)
}

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
