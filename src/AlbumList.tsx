// album 获取专辑列表
// GET: [host]/api/album

import { SetStateAction, useEffect, useState } from "react"
import request from ".//utils/request"
import { Layout, Spinner, Text } from "@ui-kitten/components"
import { List, ListItem } from "@ui-kitten/components"
import { Button, StyleSheet, useTVEventHandler } from "react-native"
import { RemoteKeys } from ".//utils/constants"
import { AlbumItem } from "types/AlbumItem"

// query:
// 参数名	备注
// _start	起始行数，0开始
// _end	结束行数
// _order	排序，可选值 ASC, DESC
// _sort	排序方式，可选值 random, createdAt, min_year, play_count, play_date, name, albumArtist, rating, 可用,分割多个排序方式，如 min_year asc,date asc
// artist_id	歌手id，可选
// rating	评分，可选
// starred	收藏状态(true/false)，可选
// name	专辑名(like 查询)，可选

export default function () {
  const [data, setData] = useState([]) // 存储列表数据
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) // 错误状态
  const [refreshing, setRefreshing] = useState(false)
  const [active, setActive] = useState(-1)
  // const istv = Platform.isTV
  // console.log("Platform:", Platform)
  // console.log("istv:", istv)

  const fetchData = async () => {
    try {
      const response = await request.get("/api/album", {
        params: {
          _start: 0,
          _end: 10,
          _order: "ASC"
        }
      })
      console.log("data:", response.data)
      console.log("data:", JSON.stringify(response.data[0]))

      setData(response.data)
      setError(null)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError(err as any)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchData()
  }

  const [lastEventType, setLastEventType] = useState("")
  const myTVEventHandler = (evt: { eventType: SetStateAction<string> }) => {
    console.log("evt.eventType:", evt.eventType)

    setLastEventType(evt.eventType)
    if (evt.eventType == RemoteKeys.down) {
      // setActive(active + 1)
    }
  }

  useTVEventHandler(myTVEventHandler)

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <Layout style={styles.container} level="1">
        <Spinner size={"large"} />
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Text>Error: {error}</Text>
        <Button title="刷新" onPress={fetchData} />
      </Layout>
    )
  }

  // return (
  //   <Layout style={styles.container} level="1">
  //     {loading ? <Spinner size={'large'} /> : <Text>123</Text>}
  //   </Layout>
  // );

  const renderItem = ({ item, index }: { item: AlbumItem; index: number }) => (
    <ListItem
      style={active == index ? styles.active : {}}
      title={`${index + 1}   ${item.name} `}
      description={`${item.albumArtist} ${(item.duration / 60).toFixed(2)} min`}
      nextFocusDown={index}
      onFocus={e => {
        // console.log("e:", e)
        console.log("index:", index)

        setActive(index)
      }}
      onPress={e => {
        console.log("index:", index)
      }}
      onBlur={e => {
        setActive(-1)
      }}
      onPressIn={e => {
        console.log("1:", 1)
      }}
      // focusable={true}
    />

    // <View style={active == index ? styles.active : styles.item} focusable={true}>
    //   <Text>{index} </Text>
    //   <Text>{item.albumArtist}</Text>
    // </View>
  )
  return (
    <Layout style={styles.container} level="1">
      <>
        {data.length > 0 ? (
          <List style={styles.list} data={data} renderItem={renderItem} />
        ) : (
          <Text>Empty</Text>
        )}
      </>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  list: {
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },
  item: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    backgroundColor: "#121212"
  },
  active: {
    flex: 1,
    flexDirection: "row",
    // height: 80,
    borderWidth: 1,
    borderColor: "red"
  }
})
