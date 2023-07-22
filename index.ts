import {
  findHighestCalorieTotal,
  findHighestThreeCalorieTotal,
} from './solutions/day1Solution'
import {
  calculateFinalScore,
  calculateFinalScoreFromGameResults,
} from './solutions/day2Solution'
import { sumBadgePriorities, sumPriorities } from './solutions/day3Solution'
import {
  findCompleteOverlaps,
  findPartialOverlaps,
} from './solutions/day4Solution'
import {
  findTopOfEachStack,
  findTopOfEachStackAgain,
} from './solutions/day5Solution'
import { findMarker } from './solutions/day6Solution'
import { findDirectories } from './solutions/day7Solution'

console.log('Day 1 Solution:')
console.log('Part 1:', findHighestCalorieTotal())
console.log('Part 2:', findHighestThreeCalorieTotal())

console.log('')

console.log('Day 2 Solution:')
console.log('Part 1:', calculateFinalScore())
console.log('Part 2:', calculateFinalScoreFromGameResults())

console.log('')

console.log('Day 3 Solution:')
console.log('Part 1:', sumPriorities())
console.log('Part 2:', sumBadgePriorities())

console.log('')
console.log('Day 4 Solution:')
console.log('Part 1:', findCompleteOverlaps())
console.log('Part 2:', findPartialOverlaps())

console.log('')
console.log('Day 5 Solution:')
console.log('Part 1:', findTopOfEachStack())
console.log('Part 2:', findTopOfEachStackAgain())

console.log('')
console.log('Day 6 Solution:')
console.log('Part 1:', findMarker(4))
console.log('Part 2:', findMarker(14))

console.log('')
console.log('Day 7 Solution:')
console.log('Part 1:', findDirectories())
