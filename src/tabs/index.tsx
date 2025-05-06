import Ionicons from "react-native-vector-icons/Ionicons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "./Home"
import { Routes } from "../constants"
import Player, { StoreProvider } from "./Player"
import More from "./More"
import {
  BottomNavigationProps,
  Icon,
  IconElement,
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text
} from "@ui-kitten/components"

import { useState } from "react"
import { StyleSheet, View } from "react-native"
import Demo from "../Demo"

const Tab = createBottomTabNavigator()

const HomeIcon = (props: any): IconElement => <Icon name="home-outline" {...props} />
const EmailIcon = (props: any) => <Icon name="cube-outline" {...props} />

const BottomTabBar = ({ navigation, state }: any) => (
  <View>
    <Player />
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="Home" icon={HomeIcon} focusable={true} />
      <BottomNavigationTab title="More" icon={EmailIcon} focusable={true} />
    </BottomNavigation>
  </View>
)

export const BottomNavigationAccessoriesShowcase = (): React.ReactElement => {
  const topState = useBottomNavigationState()
  const bottomState = useBottomNavigationState()

  return (
    <>
      <BottomNavigation style={styles.bottomNavigation} {...topState}>
        <BottomNavigationTab title="USERS" icon={HomeIcon} />

        <BottomNavigationTab title="TRANSACTIONS" icon={EmailIcon} />
      </BottomNavigation>

      <BottomNavigation style={styles.bottomNavigation} {...bottomState}>
        <BottomNavigationTab icon={HomeIcon} />
        <BottomNavigationTab icon={EmailIcon} />
      </BottomNavigation>
    </>
  )
}

const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
  const [selectedIndex, setSelectedIndex] = useState(initialState)
  return { selectedIndex, onSelect: setSelectedIndex }
}

export default function () {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }: any) => {
          if (route.name === Routes.Home) {
            return <Ionicons name="home-outline" size={size} color={color} />
          } else if (route.name === Routes.More) {
            return <Ionicons name="settings-outline" size={size} color={color} />
          }

          let iconName = "apps-outline"
          return <Ionicons name={iconName} size={size} color={color} />
        },
        // tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarLabelPosition: "below-icon"
        // title: route.name
      })}>
      <Tab.Screen
        name={Routes.Home}
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen name={Routes.More} component={More} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8
  }
})
