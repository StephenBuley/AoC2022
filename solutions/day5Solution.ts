import * as fs from 'fs'
let numOfStacks: number = 0
let initialStacks: string[] = []

interface Instruction {
  numToMove: number
  fromStack: number
  toStack: number
}

const instructions: Instruction[] = []

class Stack {
  stackNumber: number
  stack: string[] = []

  constructor(stackNum: number) {
    this.stackNumber = stackNum
  }

  push(crate: string) {
    this.stack.push(crate)
  }

  pop(): string {
    return this.stack.pop() as string
  }
}

try {
  const file = fs.readFileSync('./inputfiles/day5Input.txt', 'utf-8')
  const fileLines = file.split('\n')
  const stackNumberIndex = fileLines.indexOf('') - 1
  const numOfStacksRow = fileLines[stackNumberIndex].split(' ')
  numOfStacks = parseInt(numOfStacksRow[numOfStacksRow.length - 2])
  for (let i = stackNumberIndex - 1; i >= 0; i--) {
    initialStacks.push(fileLines[i])
  }

  for (let i = stackNumberIndex + 2; i < fileLines.length; i++) {
    const words = fileLines[i].split(' ')
    const instruction = {
      numToMove: parseInt(words[1]),
      fromStack: parseInt(words[3]),
      toStack: parseInt(words[5]),
    }
    instructions.push(instruction)
  }
} catch (error) {
  console.error(error)
}

export function findTopOfEachStack() {
  // populate stacks
  const stacks: Stack[] = []
  for (let i = 1; i <= numOfStacks; i++) {
    stacks.push(new Stack(i))
  }

  for (const stack of stacks) {
    // if x is stack number, then 4x - 3 = index of stack
    const stackIndex = 4 * stack.stackNumber - 3
    for (const init of initialStacks) {
      if (init[stackIndex] !== ' ') stack.push(init[stackIndex])
    }
  }

  // follow instructions
  for (const instruction of instructions) {
    const oldStack = stacks.find(
      (one) => one.stackNumber === instruction.fromStack,
    )
    const newStack = stacks.find(
      (one) => one.stackNumber === instruction.toStack,
    )
    for (let i = 1; i <= instruction.numToMove; i++) {
      newStack!.push(oldStack!.pop())
    }
  }

  // get top from each stack

  let result: string = ''

  for (const stack of stacks) {
    result += stack.stack[stack.stack.length - 1]
  }

  return result
}
