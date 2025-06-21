import { NavigationProp, useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Platform, TVFocusGuideView, TouchableOpacity } from "react-native"
import { Routes, RoutesParamList } from ".//utils/constants"
import { useAuth } from "./Auth"
import Player, { usePlayerStore } from "./Player"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Button, Layout, Text } from "@ui-kitten/components"
import { useRef } from "react"
import Songs from "./Songs"
import Page from "./Page"
import FocusExample from "./FocusExample"

const { Navigator, Screen } = createNativeStackNavigator()

const A = () => {
  const nav = useNavigation()
  return (
    <Button
      nextFocusUp={10}
      onPress={() => {
        nav.navigate("c" as never)
      }}>
      {`${Platform.isTV}`}
    </Button>
  )
}
const B = () => {
  return (
    <Layout>
      <TVFocusGuideView autoFocus>
        <Text>This is hero Image</Text>
        <TouchableOpacity>
          <Text>Play Now</Text>
        </TouchableOpacity>
      </TVFocusGuideView>
    </Layout>
  )
}

export default function () {
  return (
    <Layout style={styles.container}>
      <Navigator
        screenOptions={{
          headerShown: false
        }}>
        {/* <Screen name="B" component={FocusExample} /> */}
        {/* <Screen
          name="Page"
          component={Page}
          options={{
            title: "音乐"
          }}
        /> */}
        <Screen
          name="Songs"
          component={Songs}
          options={{
            title: "音乐"
          }}
        />
        <Screen
          name="A"
          component={A}
          options={{
            title: "Home"
          }}
        />
      </Navigator>
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
