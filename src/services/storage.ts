import { AsyncStorage } from "react-native"

export function save<T>(key: string, data: T): Promise<void> {
  return AsyncStorage.setItem(key, JSON.stringify(data))
}

export function get<T>(key: string): Promise<T> {
  return AsyncStorage.getItem(key).then(JSON.parse)
}
