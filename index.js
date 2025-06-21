import { AppRegistry } from "react-native"
import App from "./src/App"
import App2 from "./src/App2"
import { name as appName } from "./app.json"

function Root() {
  return <App2></App2>
}

AppRegistry.registerComponent(appName, () => Root)
