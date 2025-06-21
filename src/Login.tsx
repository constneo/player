import { useNavigation } from "@react-navigation/native"
import { useStore } from "./Store"

import BaseInput from "./components/BaseInput"
import { setBaseUrl, setToken, setUserInfo } from "./utils/storage"
import { login } from "./utils/api"
import { useAuth } from "./Auth"
import { Routes } from "./utils/constants"
import { hideSplash } from "react-native-splash-view"
import { Button, Layout, Text } from "@ui-kitten/components"

export default function () {
  const { address, setAddress, username, setUsername, password, setPassword } = useStore()

  const nav = useNavigation()

  const { login: authLogin } = useAuth()

  console.log(":", nav.getState())

  hideSplash()

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Layout
        style={{
          alignItems: "flex-start",
          justifyContent: "center"
        }}>
        <Text>地址</Text>
        <BaseInput
          style={{ height: 40 }}
          placeholder="输入地址"
          onChangeText={text => setAddress(text)}
          defaultValue={address}
        />

        <Text>用户名</Text>
        <BaseInput
          style={{ height: 40 }}
          placeholder="Type here to username."
          onChangeText={text => setUsername(text)}
          defaultValue={username}
        />

        <Text>密码</Text>
        <BaseInput
          style={{ height: 40 }}
          placeholder="Type here to password."
          onChangeText={text => setPassword(text)}
          defaultValue={password}
        />

        <Button
          onPress={async () => {
            try {
              await setBaseUrl(address)

              const res = await login({ username, password })
              console.log(res)
              await setUserInfo(res.data)
              await setToken(res.data.token)
              authLogin(res.data.token)
              nav.navigate(Routes.Tabs as never)
            } catch (error) {
              console.log(error)
            }
          }}>
          登录
        </Button>
      </Layout>
    </Layout>
  )
}
