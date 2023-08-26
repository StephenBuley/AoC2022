import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day16ExampleInput.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    for (const line of lines) {
      rows.push(line)
    }
  }
} catch (error) {
  console.error(error)
}

class Valve {
  name: string
  flowRate: number
  tunnels: string[]
  distance: number = Infinity
  visited: boolean = false
  isOpen: boolean = false

  constructor(name: string, flowRate: number, ...tunnels: string[]) {
    this.name = name
    this.flowRate = flowRate
    this.tunnels = [...tunnels]
  }

  clone() {
    return new Valve(this.name, this.flowRate, ...this.tunnels)
  }
}

export function depressurize() {
  const valves: Valve[] = generateValves(rows)
  const valvesWithDistances: Valve[] = mapValves(valves)
  console.log(valves)
  console.log(valvesWithDistances)
  // we need to see how long it would take us to get to every valve
  // once we've done that, start a sum
  // we need to figure out what changes with each minute that passes
  for (let i = 1; i <= 30; i++) {
    // check to see what the optimal valve would be
    // move to valve or open valve
    // add the total open valve flow rate to the sum
  }
  // finally, return the sum
}

function mapValves(arr: Valve[]) {
  // this makes sure we are working with a new array of clones of the valves
  const newValveArray = [...arr.map((valve) => valve.clone())]
  const firstValve = newValveArray.find((valve) => valve.name === 'AA')!
  firstValve.distance = 0
  const queue: Valve[] = [firstValve]
  // while we haven't visited every valve
  while (queue.length > 0) {
    const curr = queue.shift()!
    for (const str of curr.tunnels) {
      const nextToCheck = newValveArray.find((valve) => valve.name === str)!
      if (!nextToCheck.visited) {
        nextToCheck.distance = Math.min(curr.distance + 1, nextToCheck.distance)
        if (!queue.includes(nextToCheck)) queue.push(nextToCheck)
      }
    }
    curr.visited = true
  }

  // once every valve has a distance associated with it, return the valve array
  return newValveArray
}

function parseRow(row: string): [string, number, ...Array<string>] {
  const splitRow = row
    .split(
      /Valve | has flow rate=|; tunnels lead to valves |; tunnel leads to valve |, /,
    )
    .map((val, index) => (index === 2 ? parseInt(val) : val))

  return splitRow.slice(1) as [string, number, ...Array<string>]
}

function generateValves(rows: string[]) {
  const valves: Valve[] = []
  for (const row of rows) {
    valves.push(new Valve(...parseRow(row)))
  }
  return valves
}
