import { Text } from "@ui-kitten/components"
import React from "react"
import { View } from "react-native"
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
  SpatialNavigationView
} from "react-tv-space-navigation"

/**
 * A simple component that shows a rabbit program
 * We plug it to the Spatial Navigation easily using a FocusableView
 */
const Rabbit = ({ onSelect }: any) => (
  <SpatialNavigationFocusableView onSelect={onSelect}>
    {({ isFocused }) => {
      return (
        <View style={isFocused && { backgroundColor: "green" }}>
          <Text>A</Text>
          <Text>B</Text>
          <DefaultFocus>
            <Text>C</Text>
          </DefaultFocus>
          <Text>D</Text>
        </View>
      )
    }}
  </SpatialNavigationFocusableView>
)

const rabbits = [1, 2, 3, 4, 5, 6]

/**
 * We can have as many nodes as we want. We group our rabbits in a horizontal spatial navigation view
 * to spatially describe a row layout
 * (it includes a spatial navigation node AND the horizontal styling for it)
 *
 * We also want to scroll horizontally, so we add a horizontal scrollview.
 */
const RabbitRow = () => (
  <SpatialNavigationScrollView horizontal>
    <SpatialNavigationView direction="horizontal">
      {/* assuming you have rabbits data */}
      {rabbits.map((_: any, index: any) => (
        <Rabbit onSelect={() => console.log("selected rabbit ", index)} />
      ))}
    </SpatialNavigationView>
  </SpatialNavigationScrollView>
)

/**
 * Now I simply add a page with a Root node and a vertical scroll view to scroll through my rows.
 */

export default () => (
  <SpatialNavigationRoot>
    <SpatialNavigationScrollView>
      <RabbitRow />
      <RabbitRow />
      <RabbitRow />
      <RabbitRow />
      <RabbitRow />
      <RabbitRow />
    </SpatialNavigationScrollView>
  </SpatialNavigationRoot>
)
