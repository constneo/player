import storage from "@react-native-async-storage/async-storage"
import { UserInfo } from "./types"

export const keys = {
  token: "token",
  baseURL: "baseURL",
  userInfo: "userInfo",
  song: "song"
}

export const setUserInfo = async (value: UserInfo) => {
  await storage.setItem(keys.userInfo, JSON.stringify(value))
}

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const info = (await storage.getItem(keys.userInfo)) as string
    return JSON.parse(info)
  } catch (error) {
    return {
      name: "",
      id: "",
      isAdmin: false,
      lastFMApiKey: "",
      subsonicSalt: "",
      subsonicToken: "",
      token: "",
      username: ""
    }
  }
}
export const setToken = async (token: string) => {
  await storage.setItem(keys.token, token)
}

export const getToken = async (): Promise<string> => {
  return (await storage.getItem(keys.token)) || ""
}

export const setBaseUrl = async (url: string) => {
  await storage.setItem(keys.baseURL, url)
}

export const getBaseUrl = async (): Promise<string> => {
  return (await storage.getItem(keys.baseURL)) || ""
}

export const setCurrentSong = async (value: string) => {
  await storage.setItem(keys.song, value)
}

export const getCurrentSong = async () => await storage.getItem(keys.song)
