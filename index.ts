import * as fs from 'fs'
function findCalories() {
  try {
    const input = fs.readFileSync(`day1Input.txt`, `utf-8`)
    const lines = input.split('\n')
    const elves = []
    let cache = []
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line === '') {
        elves.push(cache)
        cache = []
      } else {
        cache.push(line)
      }
      if (i == lines.length - 1) {
        elves.push(cache)
      }
    }

    let highest = 0
    for (const elf of elves) {
      const total = elf.reduce((acc, val) => {
        return acc + parseInt(val)
      }, 0)
      if (total > highest) {
        highest = total
      }
    }
    return highest
  } catch (e) {
    console.error(e)
  }
}

console.log(findCalories())
