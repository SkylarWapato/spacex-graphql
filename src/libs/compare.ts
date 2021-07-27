import { LaunchOrderByRest } from './enums'

export const compare = <T, K extends keyof T>(prop: K, order = LaunchOrderByRest.asc) => (a: T, b: T) => {
  if ( a[prop] < b[prop] ){
    return order === LaunchOrderByRest.asc ? -1 : 1
  }
  if ( a[prop] > b[prop] ){
    return order === LaunchOrderByRest.asc ? 1 : -1
  }
  return 0
}