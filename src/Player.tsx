import {
  Avatar,
  Button,
  ButtonProps,
  Divider,
  Icon,
  IconElement,
  Layout,
  Text
} from "@ui-kitten/components"
import { createContext, JSX, useContext, useEffect, useState } from "react"
import { ImageProps, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { getCurrentSong, setCurrentSong } from "./utils/storage"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Routes, RoutesParamList } from "./utils/constants"
import Focusable from "./Focusable"

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

const ItemImage = (props: ImageProps) => (
  <Avatar {...props} style={[props.style]} source={require("../assets/icon.png")} />
)

const LeftPlayIcon = (props: any): IconElement => <Icon {...props} name="rewind-left-outline" />
const RightPlayIcon = (props: any): IconElement => <Icon {...props} name="rewind-right-outline" />
const PlayIcon = (props: any): IconElement => <Icon {...props} name="play-circle-outline" />
const PauseIcon = (props: any): IconElement => <Icon {...props} name="pause-circle-outline" />

export default (
  props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Button> & Readonly<ButtonProps>
) => {
  const { current } = usePlayerStore()
  const navigation = useNavigation<NavigationProp<RoutesParamList>>()
  const [playing, setPlaying] = useState(false)

  return (
    <Layout style={styles.container}>
      <Divider />
      <Layout style={styles.player}>
        <Layout style={styles.img}>
          <Focusable>
            <Ionicons name={"musical-note-outline"} size={24} color={"red"} />
            {/* <ItemImage /> */}
          </Focusable>
        </Layout>

        <Focusable
          onPress={() => {
            navigation.navigate(Routes.Demo)
          }}>
          <Text>{current}</Text>
        </Focusable>

        <Layout style={styles.controls}>
          <Button
            style={{}}
            status="danger"
            size="large"
            accessoryLeft={LeftPlayIcon}
            appearance="ghost"
          />

          <Layout>
            {playing ? (
              <Button
                style={{}}
                status="danger"
                size="large"
                accessoryLeft={PlayIcon}
                appearance="ghost"
              />
            ) : (
              <Button
                style={{}}
                status="danger"
                size="large"
                accessoryLeft={PauseIcon}
                appearance="ghost"
              />
            )}
          </Layout>
          <Button
            style={{}}
            status="danger"
            size="large"
            accessoryLeft={RightPlayIcon}
            appearance="ghost"
          />
          {/* <Ionicons name={"play-forward-outline"} size={24} color={"#cccccc"} /> */}
        </Layout>
      </Layout>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  player: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#000000",
    height: 60,
    width: "100%"
    // borderTopWidth: 1,
    // borderTopColor: "rgba(0,0,0,0.5)"
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
    alignItems: "flex-end"
    // gap: 5
    // justifyContent: "flex-end",
    // alignContent: "flex-end"
  }
})
