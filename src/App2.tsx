import { Text, View } from "react-native"
import { NavigationContainer, CommonActions } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Provider, BottomNavigation, Icon } from "react-native-paper"

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            animation: "shift"
          }}
          tabBar={({ navigation, state, descriptors, insets }) => (
            <BottomNavigation.Bar
              navigationState={state}
              safeAreaInsets={insets}
              onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true
                })

                if (event.defaultPrevented) {
                  preventDefault()
                } else {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name, route.params),
                    target: state.key
                  })
                }
              }}
              renderIcon={({ route, focused, color }) =>
                descriptors[route.key].options.tabBarIcon?.({
                  focused,
                  color,
                  size: 24
                }) || null
              }
              getLabelText={({ route }) => {
                const { options } = descriptors[route.key]
                const label =
                  typeof options.tabBarLabel === "string"
                    ? options.tabBarLabel
                    : typeof options.title === "string"
                    ? options.title
                    : route.name

                return label
              }}
            />
          )}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => <Icon source="home" color={color} size={26} />
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color }) => <Icon source="cog" color={color} size={26} />
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
