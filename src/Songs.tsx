import {
  Avatar,
  Button,
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  TopNavigation
} from "@ui-kitten/components"
import { GestureResponderEvent, ImageProps, SafeAreaView, StyleSheet } from "react-native"
import { usePlayerStore } from "./Player"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import Focusable from "./Focusable"

const DATA1 = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
  },
  {
    id: "c3c870fd-57b6-4024-8b1d-bdb935f4eba4",
    title: "Four Item"
  },
  {
    id: "dad294fc-1f97-467d-9101-ed29c7b1a985",
    title: "Five Item"
  },
  {
    id: "af5ca0f3-40b6-48e6-b10b-256097253cbf",
    title: "Six Item"
  }
]

const getData = () => {
  return new Array(10).fill(0).map((item, index) => {
    return {
      id: `af5ca0f3-40b6-48e6-b10b-256097253cb${index}`,
      title: `Item ${index.toString()}`,
      description: "Item name"
    }
  })
}

const DATA = getData()
console.log("DATA:", DATA)

const ItemRightButton = () => (
  <Focusable>
    <Button
      onFocus={() => console.log(11111)}
      onPress={() => {
        console.log("right button")
      }}
      appearance="ghost"
      size="medium"
      accessoryLeft={
        <Icon style={styles.icon} fill="#cccccc" name="more-horizontal-outline" />
      }></Button>
  </Focusable>
)

const RightButton = () => {
  const nav = useNavigation()

  const onAction = (event: GestureResponderEvent): void => {
    console.log("nav:", nav.getState())
  }

  return (
    <Button
      id="201"
      appearance="ghost"
      size="medium"
      onPress={onAction}
      accessoryLeft={<Icon style={styles.icon} fill="#8F9BB3" name="menu-outline" />}></Button>
  )
}

const ItemImage = (props: ImageProps) => (
  <Avatar
    {...props}
    style={[props.style, styles.itemImage]}
    source={require("../assets/icon.png")}
  />
)

type ItemProps = { id: string; title: string; description: string; isFocused: boolean }

const Item = (props: ItemProps) => {
  const { setCurrent } = usePlayerStore()
  const { title, description, id } = props
  const [f, setF] = useState(false)

  return (
    <Focusable
      id={props.id}
      onPress={() => {
        console.log("显示播放组件:", props.id)

        setCurrent(title)
      }}>
      <ListItem
        onLongPress={e => {}}
        onFocus={() => console.log(props.id)}
        style={{ ...styles.item }}
        title={props.title}
        description={`${props.description} `}
        accessoryLeft={ItemImage as unknown as React.ReactElement}
        accessoryRight={ItemRightButton}
      />
    </Focusable>
  )
}

export default function () {
  // const [lastEventType, setLastEventType] = useState("")

  // const myTVEventHandler = (evt: { eventType: SetStateAction<string> }) => {
  //   setLastEventType(evt.eventType)
  // }

  // useTVEventHandler(myTVEventHandler)

  // const isFocused = lastEventType == "focus"

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="音乐" accessoryRight={RightButton} />
      <Divider />

      <Layout style={styles.container}>
        <Layout style={styles.controls}>
          <Button appearance="outline" accessoryLeft={<Icon name="play-circle-outline"></Icon>}>
            播放
          </Button>
          <Button appearance="outline" accessoryLeft={<Icon name="shuffle-2-outline"></Icon>}>
            随机播放
          </Button>
        </Layout>
        {/*<Layout style={styles.list}> */}
        <List
          data={DATA}
          ItemSeparatorComponent={Divider}
          renderItem={({ item }) => <Item isFocused={false} {...item} />}
          keyExtractor={item => item.id}
        />
      </Layout>
      {/* </Layout> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  controls: {
    display: "none",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  list: {
    flex: 1
  },
  item: {
    // backgroundColor: "#f9c2ff",
    // marginVertical: 8,
    // marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
    // borderBottomWidth: 1,
    // borderColor: "rgba(0,0,0,0.5)"
  },
  title: {
    fontSize: 32
  },
  icon: {
    width: 32,
    height: 32
  },
  itemImage: {
    tintColor: ""
  },
  focused: {
    borderColor: "red",
    borderWidth: 1
  },
  blur: {
    borderWidth: 0
  }
})
