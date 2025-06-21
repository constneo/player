import { usePlayerStore } from "./Player"
import { Text, Layout } from "@ui-kitten/components"

export default function Demo() {
  const { current } = usePlayerStore()

  return (
    <Layout>
      <Text>{current}</Text>
    </Layout>
  )
}
