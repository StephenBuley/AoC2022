import * as fs from 'fs'
// type for function return
type ReadFileResponse = Error | string[]
export function getInputFromFile(filename: string): ReadFileResponse {
  try {
    const input = fs.readFileSync(filename, 'utf-8')
    return input.split('\n')
  } catch (error) {
    throw new Error(
      'Something went wrong reading the file: check your filename and file placement',
    )
  }
}
