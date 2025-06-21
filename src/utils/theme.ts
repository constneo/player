import { createContext, useContext, useState } from "react"
import { Platform, useColorScheme } from "react-native"

// export const ThemeContext = createContext({
//   bg: '#222',
//   color: '#fff',
//   pcolor: '#333', // placeholderTextColor
// });

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
})

export const useTheme = () => {
  // const isTV = Platform.isTV;
  // const systemTheme = useColorScheme();
  // const isDarkMode = systemTheme === 'dark';

  return useContext(ThemeContext)
}
