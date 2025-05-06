// In App.js in a new project
import * as React from "react"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "./Login"
import { useAuth } from "./Auth"
import Tabs from "./Tabs"
import { Routes } from "./utils/constants"
import Demo from "./Demo"
import { StoreProvider } from "./Player"
import AlbumList from "./AlbumList"

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

export default function DynamicRouter() {
  const { isAuth } = useAuth()

  return (
    <NavigationContainer
      theme={darkTheme}
      linking={{ enabled: false, prefixes: ["myapp://"] }} // TV 上禁用 deep linking
      documentTitle={{ enabled: false }} // TV 不需要网页标题
    >
      <StoreProvider>
        <Stack.Navigator>
          {isAuth ? (
            <>
              <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{
                  headerShown: false
                }}
              />

              <Stack.Screen name={Routes.Demo} component={Demo} />
            </>
          ) : (
            <Stack.Screen name={Routes.Login} component={Login} options={{}} />
          )}

          <Stack.Group screenOptions={{ presentation: "modal" }}>
            {/* <Stack.Screen name={Routes.Demo} component={Demo} /> */}
            <Stack.Screen name={Routes.AlbumList} component={AlbumList} />
          </Stack.Group>
        </Stack.Navigator>
      </StoreProvider>
    </NavigationContainer>
  )
}
