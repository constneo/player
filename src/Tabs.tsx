import Ionicons from "react-native-vector-icons/Ionicons"
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "./Home"
import { Routes } from "./utils/constants"
import Player, { StoreProvider, usePlayerStore } from "./Player"
import More from "./More"
import {
  Icon,
  IconElement,
  BottomNavigation,
  BottomNavigationTab,
  Text,
  useTheme
} from "@ui-kitten/components"

import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import { useFocusEffect, useLinkBuilder, useNavigation } from "@react-navigation/native"
import { PlatformPressable } from "@react-navigation/elements"
import Focusable from "./Focusable"
import { hideSplash } from "react-native-splash-view"
import { useAuth } from "./Auth"

const Tab = createBottomTabNavigator()

const HomeIcon = (props: any): IconElement => {
  return <Icon name="home-outline" {...props} />
}
const EmailIcon = (props: any) => <Icon name="cube-outline" {...props} />

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  const { colors } = useTheme()
  const { current } = usePlayerStore()

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      }
    }, [])
  )
  {
    console.log("state.index:", state.index)
  }

  const [focused, setFocused] = useState(0)
  const bg = "rgba(255,255,255,.1)"

  return (
    <View style={{ height: 120, flexDirection: "column" }}>
      <Player />

      <BottomNavigation
        style={{ backgroundColor: "transparent" }}
        selectedIndex={state.index}
        indicatorStyle={{ height: 0 }}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab
          title="Home"
          icon={HomeIcon}
          style={
            {
              // backgroundColor: focused === 0 ? bg : "transparent"
            }
          }
          onPress={() => {
            setFocused(0)
          }}
          onFocus={() => {
            console.log("index:", 0)

            setFocused(0)
          }}
          onBlur={() => setFocused(-1)}
        />

        <BottomNavigationTab
          focusable={true}
          title="More"
          icon={EmailIcon}
          style={
            {
              // backgroundColor: focused === 1 ? bg : "transparent"
            }
          }
          onPress={() => {
            setFocused(1)
          }}
          onFocus={() => {
            console.log("index:", 1)

            setFocused(1)
          }}
          onBlur={() => setFocused(-1)}
        />
      </BottomNavigation>
    </View>
  )
}

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // const { colors } = useTheme()
  const theme = useTheme()
  // console.log("theme:", JSON.stringify(theme))

  const { buildHref } = useLinkBuilder()

  return (
    <View style={{ flexDirection: "column", height: 120 }}>
      <Player />

      <View style={{ flexDirection: "row", flex: 1 }}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key
            })
          }

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, flexDirection: "column" }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  backgroundColor: "transparent"
                }}>
                <Icon
                  name="home"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  fill={isFocused ? theme["text-primary-color"] : "white"}
                />
                <Text
                  style={{
                    color: isFocused ? theme["text-primary-color"] : "white",
                    // color: isFocused ? colors.primary : colors.text,
                    textAlign: "center",
                    alignItems: "center"
                  }}>
                  {label}
                </Text>
              </View>
            </PlatformPressable>
          )
        })}
      </View>
    </View>
  )
}

export default function () {
  const { isAuth } = useAuth()
  const nav = useNavigation()

  console.log("navigation:", nav.getState())

  // useEffect(() => {
  //   if (!isAuth) {
  //     nav.navigate(Routes.Login as never)
  //   }
  // }, [])

  hideSplash()

  return (
    <Tab.Navigator
      // tabBar={props => <BottomTabBar {...props} />}
      // tabBar={props => <MyTabBar {...props} />}

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
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarLabelPosition: "below-icon", // material
        // title: route.name
        animation: "shift", //shift  fade
        headerShown: false,
        freezeOnBlur: false,
        tabBarPosition: "left",
        tabBarVariant: "material"
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
