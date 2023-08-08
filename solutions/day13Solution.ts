import { getInputFromFile } from '../utils/getInputFromFile'

type Packet = number | (number | Packet)[]

type Pair = {
  left: Packet
  right: Packet
}

const pairs: Pair[] = []

const input: Packet[] = []

try {
  const lines = getInputFromFile('./inputfiles/day13ExampleInput.txt')

  if (lines instanceof Error) {
    throw new Error('something bad happened')
  } else {
    // parse packets
    for (const line of lines) {
      input.push(line === '' ? [] : (JSON.parse(line) as Packet))
    }
  }
} catch (error) {
  console.error(error)
}

export function sumCorrectlySentPacketIndices() {
  const packet = input[0]
}
