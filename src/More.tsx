import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Button, Layout, Text } from "@ui-kitten/components"
import { Routes, RoutesParamList } from "./utils/constants"
import Player, { usePlayerStore } from "./Player"
import { StyleSheet } from "react-native"
import request from "./utils/request"
import { AxiosResponse } from "axios"
import { KeepaliveRes } from "./utils/types"
import { getBaseUrl } from "./utils/storage"
import { useRef } from "react"

export default () => {
  const navigation = useNavigation<NavigationProp<RoutesParamList>>()
  const { current, setCurrent } = usePlayerStore()

  return (
    <Layout style={styles.container}>
      <Layout style={styles.btns}>
        <Button
          id="2"
          nextFocusUp={0}
          onPress={() => {
            navigation.navigate(Routes.AlbumList)
          }}>
          专辑列表
        </Button>

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
        </Button>

        {/* <Button focusable={true} onPress={logout}>
          退出登录
        </Button> */}
      </Layout>

      {/* <Player id="0" /> */}
    </Layout>
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
