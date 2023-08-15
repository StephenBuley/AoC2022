import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day15ExampleInput.txt')

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

class Point {
  x: number
  y: number
  value = '.'

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

class Beacon extends Point {
  value = 'B'

  constructor(x: number, y: number) {
    super(x, y)
  }
}

class Sensor extends Point {
  distance: number
  value = 'S'

  constructor(x: number, y: number, distance: number) {
    super(x, y)
    this.distance = distance
  }
}

export function determineBeaconPlacement() {
  /* 
  what we want is I guess a grid of some sort, where we know where each beacon is, each sensor is, and its area of effect
    then just count the unaffected areas? 
  */
  let lowestX = 199999990
  let highestX = 0
  let lowestY = 199999990
  let highestY = 0
  const sensors: Sensor[] = []
  const beacons: Beacon[] = []
  for (const row of rows) {
    const [x1, y1, x2, y2] = getCoords(row)
    lowestX = Math.min(lowestX, x1, x2)
    highestX = Math.max(highestX, x1, x2)
    lowestY = Math.min(lowestY, y1, y2)
    highestY = Math.max(highestY, y1, y2)
    const distance = getManhattanDistance(x1, y1, x2, y2)
    sensors.push(new Sensor(x1, y1, distance))

    if (!beacons.find((beacon) => beacon.x == x2 && beacon.y == y2)) {
      beacons.push(new Beacon(x2, y2))
    }
  }

  const grid: string[][] = []
  const offsetX = 0 - lowestX
  const offsetY = 0 - lowestY
  for (let i = lowestY; i <= highestY; i++) {
    grid[i + offsetY] = []
    for (let j = lowestX; j <= highestX; j++) {
      grid[i + offsetY][j + offsetX] = '.'
    }
  }
  for (const sensor of sensors) {
    grid[sensor.y + offsetY][sensor.x + offsetX] = sensor.value
  }
  for (const beacon of beacons) {
    grid[beacon.y + offsetY][beacon.x + offsetX] = beacon.value
  }

  const drawnGrid = grid.map((row) => row.join('')).join('\n')
  console.log(drawnGrid)
}

function getManhattanDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function getCoords(row: string) {
  return row
    .split(/Sensor at x=|, y=|: closest beacon is at x=/)
    .slice(1)
    .map(Number)
}
