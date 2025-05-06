/**
 * @format
 */

import { AppRegistry } from "react-native"
import App from "./src/App"
import { name as appName } from "./app.json"

function Root() {
  return <App></App>
}

AppRegistry.registerComponent(appName, () => Root)
