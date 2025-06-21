/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react"
import Router from "./Router"
import { AuthProvider } from "./Auth"
import * as eva from "@eva-design/eva"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { ThemeContext } from "./utils/theme"
import { getTheme, setTheme as saveTheme } from "./utils/storage"
import { hideSplash, showSplash } from "react-native-splash-view"

function App() {
  const [theme, setTheme] = React.useState("light")

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
    saveTheme(nextTheme)
  }

  // console.log("eva:", eva)
  // showSplash() // 如果原生端未设置启动

  useEffect(() => {
    const checkTheme = async () => {
      const t = await getTheme()
      // console.log("theme:", t)
      setTheme(t)
    }

    checkTheme()

    // setTimeout(() => {
    //   hideSplash() // Hide after some time
    // }, 5000)
  }, [])

  return (
    <AuthProvider>
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ApplicationProvider {...eva} theme={eva[theme as never]}>
            <Router {...eva} />
          </ApplicationProvider>
        </ThemeContext.Provider>
      </>
    </AuthProvider>
  )
}

export default App
