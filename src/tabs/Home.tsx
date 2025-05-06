import { NavigationProp, useNavigation } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"
import { RoutesParamList } from "../constants"
import { useAuth } from "../Auth"
import Player, { usePlayerStore } from "./Player"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Button, Text } from "@ui-kitten/components"

const { Navigator, Screen } = createNativeStackNavigator()

const A = () => {
  const nav = useNavigation()
  return (
    <Button
      onPress={() => {
        nav.navigate("c" as never)
      }}>
      AAAAA
    </Button>
  )
}
const B = () => <Text>BBBBB</Text>
const C = () => <Text>ccc</Text>

export default function () {
  const navigation = useNavigation<NavigationProp<RoutesParamList>>()
  const { logout } = useAuth()
  const { current, setCurrent } = usePlayerStore()

  return (
    // <View style={styles.container}>
    //   <View style={styles.btns}></View>
    //   {/* <Player /> */}
    // </View>

    <Navigator>
      <Screen name="Home" component={A} />
      <Screen name="b" component={B} />
      <Screen name="c" component={C} />
    </Navigator>
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
