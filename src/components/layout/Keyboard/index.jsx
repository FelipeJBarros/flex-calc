import { StyleSheet, View } from "react-native";
import KeyboardRow from "./Row";

export default function Keyboard({ children }) {
  return (
    <View style={styles.controlsContainer}>
      <View style={styles.column}>
        {children}
      </View>
    </View>
  )
}

Keyboard.Row = KeyboardRow;

const styles = StyleSheet.create({
  controlsContainer: {
    flex: 3,
    flexDirection: "row",
    gap: 20,
    backgroundColor: "#292d36",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 20,
  },
  column: {
    flex: 1,
    gap: 20,
  },
});
