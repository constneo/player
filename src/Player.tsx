import { Button, ButtonProps, Text } from "@ui-kitten/components"
import { createContext, JSX, useContext, useEffect, useState } from "react"
import { Alert, StyleSheet, TouchableOpacity, TVFocusGuideView, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { getCurrentSong, setCurrentSong } from "./utils/storage"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Routes, RoutesParamList } from "./utils/constants"

const StoreContext = createContext({
  current: "",
  setCurrent: (c: string) => {}
})

export function StoreProvider({ children }: any) {
  const [current, setCurrent] = useState("")

  useEffect(() => {
    const checkSong = async () => {
      const song = await getCurrentSong()
      !!song && setCurrent(song)
    }
    checkSong()
  }, [])

  return (
    <StoreContext.Provider
      value={{
        current,
        setCurrent: async v => {
          await setCurrentSong(v)
          setCurrent(v)
        }
      }}>
      {children}
    </StoreContext.Provider>
  )
}

export const usePlayerStore = () => useContext(StoreContext)

/*

<ion-icon name="play-outline"></ion-icon>

<ion-icon name="musical-note-outline"></ion-icon>

<ion-icon name="play-back-outline"></ion-icon>

<ion-icon name="play-forward-outline"></ion-icon>

<ion-icon name="pause-outline"></ion-icon>
*/

export default (
  props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Button> & Readonly<ButtonProps>
) => {
  const { current } = usePlayerStore()
  const navigation = useNavigation<NavigationProp<RoutesParamList>>()
  const [playing, setPlaying] = useState(false)

  return (
    <View style={styles.player}>
      <View style={styles.img}>
        <Ionicons name={"musical-note-outline"} size={24} color={"red"} />
      </View>

      <TVFocusGuideView autoFocus>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.Demo)
          }}>
          <Text>{current}</Text>
        </TouchableOpacity>
      </TVFocusGuideView>

      <View style={styles.controls}>
        <Ionicons name={"play-back-outline"} size={24} color={"#cccccc"} />
        <View>
          {playing ? (
            <Ionicons
              name={"pause-outline"}
              size={24}
              color={"#cccccc"}
              onPress={() => setPlaying(!playing)}
            />
          ) : (
            <Ionicons
              name={"play-outline"}
              size={24}
              color={"#cccccc"}
              onPress={() => setPlaying(!playing)}
            />
          )}
        </View>

        <Ionicons name={"play-forward-outline"} size={24} color={"#cccccc"} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  player: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000000",
    height: 60,
    width: "100%"
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20
  },
  controls: {
    marginRight: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10
    // justifyContent: "flex-end",
    // alignContent: "flex-end"
  }
})
