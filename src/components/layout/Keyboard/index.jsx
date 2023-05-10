import { StyleSheet, View } from "react-native";
import KeyboardRow from "./Row";

import { useContext } from "react";
import { ThemeContext } from "../../../contexts/Theme";
export default function Keyboard({ children }) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View style={[styles.controlsContainer, { backgroundColor: isDark ? "#292d36" : "#f9f9f9" }]}>
      <View style={styles.column}>
        {children}
      </View>
    </View>
  )
}

Keyboard.Row = KeyboardRow;

const styles = StyleSheet.create({
  controlsContainer: {
    flex: 2,
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
