import { getInputFromFile } from '../utils/getInputFromFile'

const instructions: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day7Input.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    instructions.push(...lines)
  }
} catch (error) {
  console.error(error)
}

class Node {
  size: number | undefined
  name: string

  constructor(name: string, size?: number) {
    this.name = name
    this.size = size
  }
}

class Directory extends Node {
  children: Node[] = []

  constructor(name: string, size?: number) {
    super(name, size)
  }
}

class File extends Node {
  constructor(name: string, size?: number) {
    super(name, size)
  }
}

export function findDirectories() {
  const directories = createDirectories(instructions)
  let currentDirectory = '/'
  for (const line of instructions) {
    const instruction = line.split(' ')
    if (instruction[0] === '$') {
      if (instruction[1] === 'cd') {
        currentDirectory = instruction[2]
      }
    }
  }
}

function createDirectories(instructions: string[]) {
  const directories: Directory[] = []
  for (const line of instructions) {
    const instruction = line.split(' ')
    if (instruction[0] === 'dir') {
      const newDir = new Directory(instruction[1])
      directories.push(newDir)
    }
  }
  return directories
}
