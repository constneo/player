// In App.js in a new project
import * as React from "react"
import { DefaultTheme, NavigationContainer, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "./Login"
import { AuthContext, useAuth } from "./Auth"
import Tabs from "./Tabs"
import { Routes } from "./utils/constants"
import Demo from "./Demo"
import { StoreProvider } from "./Player"
import AlbumList from "./AlbumList"
import Zero from "./Zero"
import { Alert, BackHandler } from "react-native"

const Stack = createNativeStackNavigator()

const darkTheme = {
  ...DefaultTheme,
  colors: {
    background: "#121212",
    primary: "#BB86FC",
    card: "#1E1E1E",
    text: "#FFFFFF",
    border: "#383838",
    notification: "#CF6679"
  },
  dark: true
}

const onCancel = () => {
  React.useEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          {
            text: "Cancel",
            onPress: () => {
              // Do nothing
            },
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      )

      return true
    }

    const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress)

    return () => backHandler.remove()
  }, [])
}

export default function (props: any) {
  return (
    <NavigationContainer theme={darkTheme}>
      <StoreProvider>
        <Stack.Navigator
          // initialRouteName={Routes.Tabs}
          screenOptions={{
            headerShown: false,
            animation: "slide_from_bottom"
          }}>
          <Stack.Screen name="Tabs" component={Tabs} options={{}} />

          <Stack.Screen name={Routes.Demo} component={Demo} />

          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name={Routes.Zero} component={Zero} />
            <Stack.Screen name={Routes.Login} component={Login} options={{}} />
            <Stack.Screen name={Routes.AlbumList} component={AlbumList} options={{}} />
          </Stack.Group>
        </Stack.Navigator>
      </StoreProvider>
    </NavigationContainer>
  )
}
