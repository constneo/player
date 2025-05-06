/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react"
import Router from "./Router"
import { AuthProvider } from "./Auth"
import * as eva from "@eva-design/eva"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"

function App() {
  return (
    <AuthProvider>
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <Router />
        </ApplicationProvider>
      </>
    </AuthProvider>
  )
}

export default App
