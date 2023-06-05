import {
  findHighestCalorieTotal,
  findHighestThreeCalorieTotal,
} from './solutions/day1Solution'
import {
  calculateFinalScore,
  calculateFinalScoreFromGameResults,
} from './solutions/day2Solution'
import { sumBadgePriorities, sumPriorities } from './solutions/day3Solution'
import { findCompleteOverlaps } from './solutions/day4Solution'

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
