import { getInputFromFile } from '../utils/getInputFromFile'

const rows: string[] = []

try {
  const lines = getInputFromFile('./inputfiles/day15Input.txt')

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

type Interval = [number, number]

export function numSpotsBeaconCantBeInRow(rowNum: number) {
  /* 
  what we want is I guess a grid of some sort, where we know where each beacon is, each sensor is, and its area of effect
    then just count the unaffected areas? 

  Ok the grid thing didn't work => 
    Maybe now I have to specifically look at just the line in question
      How many sensors will intersect with the line, and where will they intersect it
      
      Check each sensor to see if it's distance is within range of the line in question
      if it is - determine how many and which coordinates it will affect by detonating

      maybe my array is not for each point, but instad some kind of determination of how many in a row are the same (blocked, unblocked or whatever)
  */

  // look through each sensor and determine how far they are from the row number
  const { sensors, beacons } = parseInput(rows)

  const intervals: Interval[] = [] // [[1, 3], [2, 4]] => [[1, 4]]
  for (const sensor of sensors) {
    const distanceFromRow = getManhattanDistance(
      sensor.x,
      sensor.y,
      sensor.x,
      rowNum,
    )
    if (distanceFromRow <= sensor.distance) {
      // this sensor intersects with the row at at least one point, probably more.
      const first = sensor.x - (sensor.distance - distanceFromRow)
      const second = sensor.x + (sensor.distance - distanceFromRow)
      intervals.push([first, second])
    }
  }
  // go through the intervals, and figure out where all of them are(?)
  intervals.sort((a, b) => (a[0] - b[0] === 0 ? a[1] - b[1] : a[0] - b[0]))
  let sum = 0
  let lastEnd = -Infinity
  // we have a sum
  // start at the beginning
  // look at the interval for start and end
  // if the start of the interval is less than the last end
  // the new start should be the last end + 1
  for (let i = 0; i < intervals.length; i++) {
    const start = Math.max(lastEnd + 1, intervals[i][0])
    for (let j = start; j <= intervals[i][1]; j++) {
      sum++
    }
    lastEnd = Math.max(lastEnd, intervals[i][1])
  }

  const beaconsInRow = beacons.filter((beacon) => beacon.y === rowNum).length

  return sum - beaconsInRow
}

export function findBeaconNotWithinAnyRanges() {
  // march around the border of it's manhattan distance
  // if that point is within 0,0, 4000000, 4000000
  // check if it is within range of any other sensor
  // if it is, move on
  // if it isnt, do the weird calculation an return it
  const { sensors, beacons } = parseInput(rows)
  for (const sensor of sensors) {
    console.log(sensor)
    for (let i = 0; i <= sensor.distance; i++) {
      // define the coordinates that we are looking at for each round
      const northEastY = sensor.y - (sensor.distance + 1) + i
      const northEastX = sensor.x + i
      const southEastY = sensor.y + i
      const southEastX = sensor.x + (sensor.distance + 1) - i
      const southWestY = sensor.y + (sensor.distance + 1) - i
      const southWestX = sensor.x - i
      const northWestY = sensor.y - i
      const northWestX = sensor.x - (sensor.distance + 1) + i
      // look at each coordinate and decide if it is within manhattan distance of another sensor
      if (inBounds(northEastX, northEastY)) {
        let found = false
        for (const otherSensor of sensors) {
          const distanceToSensor = getManhattanDistance(
            otherSensor.x,
            otherSensor.y,
            northEastX,
            northEastY,
          )
          if (distanceToSensor <= otherSensor.distance) {
            // stop checking and move on
            found = true
            break
          }
        }
        if (found) continue
        return 4000000 * northEastX + northEastY
      } else if (inBounds(southEastX, southEastY)) {
        let found = false
        for (const otherSensor of sensors) {
          const distanceToSensor = getManhattanDistance(
            otherSensor.x,
            otherSensor.y,
            southEastX,
            southEastY,
          )
          if (distanceToSensor <= otherSensor.distance) {
            // stop checking and move on
            found = true
            break
          }
        }
        if (found) continue
        return 4000000 * southEastX + southEastY
      } else if (inBounds(southWestX, southWestY)) {
        let found = false
        for (const otherSensor of sensors) {
          const distanceToSensor = getManhattanDistance(
            otherSensor.x,
            otherSensor.y,
            southWestX,
            southWestY,
          )
          if (distanceToSensor <= otherSensor.distance) {
            // stop checking and move on
            found = true
            break
          }
        }
        if (found) continue
        return 4000000 * southWestX + southWestY
      } else if (inBounds(northWestX, northWestY)) {
        let found = false
        for (const otherSensor of sensors) {
          const distanceToSensor = getManhattanDistance(
            otherSensor.x,
            otherSensor.y,
            northWestX,
            northWestY,
          )
          if (distanceToSensor <= otherSensor.distance) {
            // stop checking and move on
            found = true
            break
          }
        }
        if (found) continue
        return 4000000 * northWestX + northWestY
      }
    }
  }
}

function parseInput(rows: string[]) {
  const sensors: Sensor[] = []
  const beacons: Beacon[] = []
  for (const row of rows) {
    const [x1, y1, x2, y2] = getCoords(row)
    const distance = getManhattanDistance(x1, y1, x2, y2)
    sensors.push(new Sensor(x1, y1, distance))

    if (!beacons.find((beacon) => beacon.x == x2 && beacon.y == y2)) {
      beacons.push(new Beacon(x2, y2))
    }
  }
  return { sensors, beacons }
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

function inBounds(currX: number, currY: number) {
  return currX >= 0 && currX <= 4000000 && currY >= 0 && currY <= 4000000
}
