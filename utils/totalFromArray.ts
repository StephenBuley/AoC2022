// helper function
export function totalFromArray(arr: string[]) {
  return arr.reduce((acc, val) => {
    return acc + parseInt(val)
  }, 0)
}
