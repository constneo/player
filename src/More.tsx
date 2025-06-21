import { NavigationProp, useNavigation } from "@react-navigation/native"
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button
} from "@ui-kitten/components"
import { Routes, RoutesParamList } from "./utils/constants"
import Player, { usePlayerStore } from "./Player"
import {
  Alert,
  Button as BaseButton,
  SafeAreaView,
  StyleSheet,
  TVFocusGuideView
} from "react-native"
import request from "./utils/request"
import { AxiosResponse } from "axios"
import { KeepaliveRes } from "./utils/types"
import { getBaseUrl, setCurrentSong } from "./utils/storage"
import { ThemeContext, useTheme } from "./utils/theme"
import { useContext, useEffect } from "react"
import Focusable from "./Focusable"
import { Button as MButton } from "react-native-paper"

// const Button = (props: any) => {
//   return <BaseButton title={props.children} {...props}></BaseButton>
// }

export default () => {
  const navigation = useNavigation<NavigationProp<RoutesParamList>>()
  const { current, setCurrent } = usePlayerStore()
  const theme = useTheme()

  const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />

  const navigateBack = () => {
    navigation.goBack()
  }

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Screen is focused")
      // The screen is focused
      // Call any action
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="More" />
      <Divider />
      <Layout style={styles.container}>
        <Layout style={styles.btns}>
          <Focusable id="切换主题">
            <MButton icon="camera" mode="contained" onPress={theme.toggleTheme}>
              切换主题
            </MButton>
          </Focusable>
          <Focusable id="专辑列表">
            <MButton
              onPress={() => {
                console.log("navigation.getState:", navigation.getState())

                navigation.navigate(Routes.AlbumList)
              }}>
              专辑列表
            </MButton>
          </Focusable>
          {/*
          <Button
            onPress={() => {
              navigation.navigate(Routes.AlbumList)
            }}>
            歌单列表
          </Button>

          <Button
            onPress={() => {
              navigation.navigate(Routes.AlbumList)
            }}>
            歌手列表
          </Button>

          <Button
            onPress={() => {
              setCurrent(`${new Date().getMilliseconds()}`)
            }}>
            测试更新歌曲
          </Button>

          <Button
            onPress={() => {
              const s = navigation.getState()
              console.log("s:", s)

              navigation.navigate(Routes.Demo)
            }}>
            测试modal
          </Button>

          <Button
            onPress={async () => {
              const baseURL = await getBaseUrl()
              //[host]/api/keepalive/keepalive
              const url = `${baseURL}/api/keepalive/keepalive`
              console.log(url)

              //id:"keepalive"
              // response:"ok"
              // 保活意思是还是使用当前token?
              request
                .get("/api/keepalive/keepalive")
                .then((res: AxiosResponse<KeepaliveRes>) => {
                  console.log(res.data)
                })
                .catch(err => {
                  console.log(err)
                })
            }}>
            保活
          </Button> */}

          {/* <Button focusable={true} onPress={logout}>
          退出登录
        </Button> */}

          {/* <Button
            focusable={true}
            onPress={() => {
              setCurrent("")
            }}>
            清空缓存
          </Button> */}
        </Layout>

        {/* <Player id="0" /> */}
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  btns: {
    flex: 1,
    flexDirection: "column"
  }
})
