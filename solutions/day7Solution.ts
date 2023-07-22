import { getInputFromFile } from '../utils/getInputFromFile'

const instructions: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day7Input.txt')

  if (lines instanceof Error) {
  } else {
    instructions.push(...lines)
  }
} catch (error) {
  console.error(error)
}

class File {
  name: string
  size?: number

  constructor(name: string, size?: number) {
    this.name = name
    this.size = size
  }
}

class Directory extends File {
  children: File[] = []
  parent?: Directory
  name!: string
  size?: number

  constructor(name: string, parent?: Directory, size?: number) {
    super(name, size)
    this.parent = parent
  }

  addChild(newFile: File) {
    this.children.push(newFile)
  }
}

export function findDirectories() {
  const rootDirectory = new Directory('/', undefined)
  let currentDirectory = rootDirectory // this is your problem - modifying the original root directory you goof

  // map out all directories
  for (const instruction of instructions) {
    const line = instruction.split(' ')
    if (line[0] === '$') {
      if (line[1] === 'cd') {
        currentDirectory = changeDirectory(line[2], currentDirectory)
      }
    } else if (line[0] === 'dir') {
      currentDirectory.addChild(new Directory(line[1], currentDirectory))
      console.log(currentDirectory)
    } else {
      currentDirectory.addChild(new File(line[1], parseInt(line[0])))
    }
  }
}

function changeDirectory(toDir: string, currentDir: Directory) {
  if (toDir === '..') {
    return currentDir.parent || currentDir
  } else {
    const foundDir = currentDir.children.find((child) => child.name === toDir)
    return foundDir instanceof Directory
      ? foundDir
      : new Directory(toDir, currentDir)
  }
}
