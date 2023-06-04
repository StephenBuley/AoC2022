import { getInputFromFile } from '../utils/getInputFromFile'

const backpacks: string[] = []

try {
  const response = getInputFromFile('./inputfiles/day3Input.txt')
  if (response instanceof Error) {
  } else {
    backpacks.push(...response)
  }
} catch (e) {
  console.error(e)
}

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function sumPriorities() {
  let total = 0
  for (const pack of backpacks) {
    const first = pack.slice(0, pack.length / 2)
    const second = pack.slice(pack.length / 2)
    Loop2: for (const letter of first) {
      if (second.includes(letter)) {
        total += alpha.indexOf(letter) + 1
        break Loop2
      }
    }
  }
  return total
}

export function sumBadgePriorities() {
  let total = 0
  for (let i = 0; i < backpacks.length - 1; i += 3) {
    const pack1 = backpacks[i]
    const pack2 = backpacks[i + 1]
    const pack3 = backpacks[i + 2]

    for (const letter of pack1) {
      if (pack2.includes(letter) && pack3.includes(letter)) {
        total += alpha.indexOf(letter) + 1
        break
      }
    }
  }
  return total
}
