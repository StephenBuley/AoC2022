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
  parent: Directory | null

  constructor(name: string, parent: Directory | null, size?: number) {
    super(name, size)
    this.parent = parent
  }

  addChild(name: string, type: 'directory' | 'file', size?: number) {
    let newContent
    if (type === 'file') {
      newContent = new File(name, size)
    } else if (type === 'directory') {
      newContent = new Directory(name, this)
    }
    this.children.push(newContent!)
    return newContent!
  }
}

function isDirectory(node: Node): node is Directory {
  return node instanceof Directory
}

export function findDirectories() {
  const root = new Directory('/', null)
  let currentDirectory = root
  const directories = [root]
  for (const line of instructions) {
    const word = line.split(' ')
    if (word[1] === 'cd') {
      if (word[2] === '..') {
        currentDirectory = currentDirectory.parent!
      } else {
        const currentChildren: Directory[] =
          currentDirectory.children.filter(isDirectory)
        currentDirectory =
          currentChildren.find((dir) => dir.name === word[2]) ||
          currentDirectory
      }
    } else if (word[0] === 'dir') {
      const newDir = currentDirectory.addChild(word[1], 'directory')
      if (isDirectory(newDir)) {
        directories.push(newDir)
      }
    } else if (word[0] !== '$') {
      currentDirectory.addChild(word[1], 'file', parseInt(word[0]))
    }
  }

  let sum = 0
  for (const dir of directories) {
    const size = getDirectorySize(dir)
    if (size <= 100000) {
      sum += size
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
