import { useNavigation, useTheme } from "@react-navigation/native"
import { useStore, useUserInfo } from "/store"
import { useEffect } from "react"
import request from "./api/request"
import { Button, Text, TextInput, View } from "react-native"

/*
 * To keep the template simple and small we're adding padding to prevent view
 * from rendering under the System UI.
 * For bigger apps the recommendation is to use `react-native-safe-area-context`:
 * https://github.com/AppAndFlow/react-native-safe-area-context
 *
 * You can read more about it here:
 * https://github.com/react-native-community/discussions-and-proposals/discussions/827
 */
const safePadding = "5%"

function Banner() {
  return (
    <View
      style={{
        height: 100,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
      }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20
        }}>
        Navidrome
      </Text>
    </View>
  )
}

export default function () {
  const { address, setAddress, username, setUsername, password, setPassword } = useStore()
  const { userInfo, setUserInfo } = useUserInfo()
  // const {token, setToken} = useToken();
  const navigation = useNavigation()

  useEffect(() => {
    if (address) {
      request.defaults.baseURL = address
    }

    if (userInfo.token) {
      request.defaults.headers["x-nd-authorization"] = `Bearer ${userInfo.token}`
      request.defaults.headers["x-nd-client-unique-id"] = userInfo.id
    }
  }, [address])

  return (
    <View
      style={{
        height: "100%",
        flex: 1,
        alignItems: "center"
      }}>
      <Banner />

      <View
        style={{
          padding: safePadding,
          width: 500
        }}>
        <Text>地址</Text>
        <TextInput
          focusable={true}
          placeholder="输入地址"
          onChangeText={text => setAddress(text)}
          defaultValue={address}
        />

        <Text>用户名</Text>
        <TextInput
          placeholder="username"
          onChangeText={text => setUsername(text)}
          defaultValue={username}
        />

        <Text>密码</Text>
        <TextInput
          placeholder="password"
          onChangeText={text => setPassword(text)}
          defaultValue={password}
        />

        <Button
          hasTVPreferredFocus={true}
          nextFocusDown={0}
          title={"登录"}
          onPress={() =>
            // login({username, password})
            //   .then((res: any) => {
            //     console.log(res);
            //     setUserInfo(res.data);
            //   })
            //   .catch((err: any) => {
            //     console.log(err);
            //   })

            // @ts-ignore
            // navigation.navigate('Demo')
            {}
          }></Button>
      </View>
    </View>
  )
}
