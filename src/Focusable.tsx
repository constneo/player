import { Pressable, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {},

  focused: {
    borderColor: "white",
    borderWidth: 1
  },
  blur: {
    borderWidth: 0
  }
})

export default ({ children, style, ...props }: any) => {
  return (
    <Pressable
      {...props}
      onFocus={e => {
        console.log("props.id:", props.id)
      }}
      style={({ pressed, focused }: any) => {
        return {
          ...(pressed || focused ? styles.focused : styles.blur),
          ...style
        }
      }}>
      {children}
    </Pressable>
  )
}
