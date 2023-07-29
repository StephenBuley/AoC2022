import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day8Input.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    rows.push(...lines)
  }
} catch (error) {
  console.error(error)
}

class Tree {
  isVisibleFromWest: boolean = true
  isVisibleFromSouth: boolean = true
  isVisibleFromNorth: boolean = true
  isVisibleFromEast: boolean = true
  isOnEdge: boolean = false
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
  const trees: Tree[] = generateForest(rows)
  for (let i = 1; i < rows.length - 1; i++) {
    for (let j = 1; j < rows[0].length - 1; j++) {
      const currentTree = trees.find(
        (tree) => tree.posX === j && tree.posY === i,
      )!
      determineVisibility(trees, currentTree, rows[0].length, rows.length)
    }
  }
  let sum = 0
  for (const tree of trees) {
    if (isTreeVisible(tree)) {
      sum += 1
    }
  }
  return sum
}

export function calculateScenicScores() {
  const trees: Tree[] = generateForest(rows)
  findEdges(trees)
  const scenicScores = trees.map((tree) => {
    if (tree.isOnEdge) return 0
    return (
      getNorthScore(trees, tree) *
      getSouthScore(trees, tree) *
      getEastScore(trees, tree) *
      getWestScore(trees, tree)
    )
  })
  return Math.max(...scenicScores)
}

function getNorthScore(trees: Tree[], currentTree: Tree) {
  let i = 1
  let score = 1
  let treeToCheck = trees.find(
    (tree) =>
      tree.posX === currentTree.posX && tree.posY === currentTree.posY - 1,
  )
  while (treeToCheck && !treeToCheck.isOnEdge) {
    if (treeToCheck.height < currentTree.height) {
      score++
      i++
      treeToCheck = trees.find(
        (tree) =>
          tree.posX === currentTree.posX && tree.posY === currentTree.posY - i,
      )
    } else {
      break
    }
  }
  return score
}
function getSouthScore(trees: Tree[], currentTree: Tree) {
  let i = 1
  let score = 1
  let treeToCheck = trees.find(
    (tree) =>
      tree.posX === currentTree.posX && tree.posY === currentTree.posY + 1,
  )
  while (treeToCheck && !treeToCheck.isOnEdge) {
    if (treeToCheck.height < currentTree.height) {
      score++
      i++
      treeToCheck = trees.find(
        (tree) =>
          tree.posX === currentTree.posX && tree.posY === currentTree.posY + i,
      )
    } else {
      break
    }
  }
  return score
}
function getEastScore(trees: Tree[], currentTree: Tree) {
  let i = 1
  let score = 1
  let treeToCheck = trees.find(
    (tree) =>
      tree.posX === currentTree.posX - 1 && tree.posY === currentTree.posY,
  )
  while (treeToCheck && !treeToCheck.isOnEdge) {
    if (treeToCheck.height < currentTree.height) {
      score++
      i++
      treeToCheck = trees.find(
        (tree) =>
          tree.posX === currentTree.posX - i && tree.posY === currentTree.posY,
      )
    } else {
      break
    }
  }
  return score
}
function getWestScore(trees: Tree[], currentTree: Tree) {
  let i = 1
  let score = 1
  let treeToCheck = trees.find(
    (tree) =>
      tree.posX === currentTree.posX + 1 && tree.posY === currentTree.posY,
  )
  while (treeToCheck && !treeToCheck.isOnEdge) {
    if (treeToCheck.height < currentTree.height) {
      score++
      i++
      treeToCheck = trees.find(
        (tree) =>
          tree.posX === currentTree.posX + i && tree.posY === currentTree.posY,
      )
    } else {
      break
    }
  }
  return score
}

function findEdges(trees: Tree[]) {
  for (let i = 0; i < rows[0].length; i++) {
    const topRowTree = trees.find((tree) => tree.posX === i && tree.posY === 0)
    const bottomRowTree = trees.find(
      (tree) => tree.posX === i && tree.posY === rows.length - 1,
    )
    topRowTree!.isOnEdge = true
    bottomRowTree!.isOnEdge = true
  }

  for (let i = 0; i < rows.length; i++) {
    const leftSideTree = trees.find(
      (tree) => tree.posX === 0 && tree.posY === i,
    )
    const rightSideTree = trees.find(
      (tree) => tree.posX === rows[0].length - 1 && tree.posY === i,
    )
    leftSideTree!.isOnEdge = true
    rightSideTree!.isOnEdge = true
  }
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

function determineVisibility(
  trees: Tree[],
  currentTree: Tree,
  width: number,
  height: number,
) {
  checkWest(trees, currentTree)
  checkEast(trees, currentTree, width)
  checkNorth(trees, currentTree)
  checkSouth(trees, currentTree, height)
}

function isTreeVisible(tree: Tree) {
  return (
    tree.isVisibleFromEast ||
    tree.isVisibleFromNorth ||
    tree.isVisibleFromSouth ||
    tree.isVisibleFromWest
  )
}

function checkWest(trees: Tree[], currentTree: Tree) {
  for (let i = 0; i < currentTree.posX; i++) {
    const treeToCheck = trees.find(
      (tree) => tree.posY === currentTree.posY && tree.posX === i,
    )
    if (treeToCheck!.height >= currentTree.height) {
      currentTree.isVisibleFromWest = false
      break
    }
  }
}

function checkEast(trees: Tree[], currentTree: Tree, width: number) {
  for (let i = currentTree.posX + 1; i < width; i++) {
    const treeToCheck = trees.find(
      (tree) => tree.posY === currentTree.posY && tree.posX === i,
    )
    if (treeToCheck!.height >= currentTree.height) {
      currentTree.isVisibleFromEast = false
      break
    }
  }
}

function checkNorth(trees: Tree[], currentTree: Tree) {
  for (let i = 0; i < currentTree.posY; i++) {
    const treeToCheck = trees.find(
      (tree) => tree.posX === currentTree.posX && tree.posY === i,
    )
    if (treeToCheck!.height >= currentTree.height) {
      currentTree.isVisibleFromNorth = false
      break
    }
  }
}

function checkSouth(trees: Tree[], currentTree: Tree, height: number) {
  for (let i = currentTree.posY + 1; i < height; i++) {
    const treeToCheck = trees.find(
      (tree) => tree.posX === currentTree.posX && tree.posY === i,
    )
    if (treeToCheck!.height >= currentTree.height) {
      currentTree.isVisibleFromSouth = false
      break
    }
  }
}
