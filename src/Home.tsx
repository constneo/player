import { NavigationProp, useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Platform, TVFocusGuideView, TouchableOpacity } from "react-native"
import { RoutesParamList } from ".//utils/constants"
import { useAuth } from "./Auth"
import Player, { usePlayerStore } from "./Player"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Button, Text } from "@ui-kitten/components"
import { useRef } from "react"

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
    <TVFocusGuideView autoFocus>
      <Text>This is hero Image</Text>
      <TouchableOpacity>
        <Text>Play Now</Text>
      </TouchableOpacity>
    </TVFocusGuideView>
  )
}
const C = () => <Text>ccc</Text>

export default function () {
  const navigation = useNavigation<NavigationProp<RoutesParamList>>()
  const { logout } = useAuth()
  const { current, setCurrent } = usePlayerStore()

  return (
    <View style={styles.container}>
      {/* <View style={styles.btns}></View> */}

      <Navigator>
        <Screen
          name="A"
          component={A}
          options={{
            title: "Home"
          }}
        />
        <Screen name="b" component={B} />
        <Screen name="c" component={C} />
      </Navigator>
      {/* <Player id="10" nextFocusUp={101} focusable={true} /> */}
    </View>
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
