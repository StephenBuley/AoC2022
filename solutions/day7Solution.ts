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
  name: string
  size?: number

  constructor(name: string, size?: number) {
    this.name = name
    this.size = size
  }
}

class File extends Node {
  constructor(name: string, size?: number) {
    super(name, size)
  }
}

class Directory extends Node {
  children: Node[] = []

  constructor(name: string, size?: number) {
    super(name, size)
  }
}

export function findDirectories() {
  let currentDirName = '/'
  const directories: Directory[] = [new Directory('/')]
  const files: File[] = []
  for (const line of instructions) {
    const word = line.split(' ')
    const currentDir = directories.find((dir) => dir.name === currentDirName)
    if (word[1] === 'cd' && word[2] !== '..') {
      currentDirName = word[2]
    } else if (word[0] === 'dir') {
      const newDir = new Directory(word[1])
      currentDir?.children.push(newDir)
      directories.push(newDir)
    } else if (word[0] !== '$') {
      const newFile = new File(word[1], parseInt(word[0]))
      currentDir?.children.push(newFile)
      files.push(newFile)
    }
  }

  getDirectorySize(directories[0])

  let sum = 0
  for (const dir of directories) {
    console.log(dir.size)
    if (dir.size && dir.size <= 100000) {
      console.log('BANG!')
      sum += dir.size
    }
  }
  return sum
}

function getDirectorySize(directory: Directory) {
  let totalSize = 0
  if (directory.children.length === 0) {
    directory.size = totalSize
    return totalSize
  }
  if (directory.children.every((child) => child instanceof File)) {
    for (const file of directory.children) {
      totalSize += file.size || 0
    }
  } else {
    for (const child of directory.children) {
      if (child instanceof File && child.size) {
        totalSize += child.size
      }
    }
    const subDirectories = directory.children.filter(
      (child) => child instanceof Directory,
    )
    for (const subdirectory of subDirectories) {
      if (subdirectory instanceof Directory) {
        totalSize += getDirectorySize(subdirectory)
      }
    }
  }
  directory.size = totalSize
  return totalSize
}

/*

I want the program to look at each directory, adding up the directory size as it goes.

For example, look at the outermost directory. 

The outermost directory has two directories and two files in it. 

To find the size of the outermost directory, we have to go into the other directories. 

We need to first traverse the tree and determine what the children of each directory are



*/
