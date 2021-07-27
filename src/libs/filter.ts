import { compareTwoStrings } from "string-similarity"

export const filterString = <T, K extends keyof T>(value: string, prop: K, data: T[]) => {
  return data.filter((item: any) => {
    const compare = compareTwoStrings(item[prop].toLowerCase(), value.toLowerCase()) > 0.65
    const startsWith = item[prop].toLowerCase().startsWith(value.toLowerCase())

    return !value || compare || startsWith
  })
}
