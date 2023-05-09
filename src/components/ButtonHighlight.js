import { Text, TouchableHighlight, StyleSheet } from "react-native";

import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

export function ButtonHighlight({ label, onPress, color }) {
  const { isDark } = useContext(ThemeContext);
  const standartButtonColor = isDark ? "#FCFDFD" : "#222222";
  return (
    <TouchableHighlight
      style={[
        styles.button,
        { backgroundColor: isDark ? "#272b34" : "#f7f7f7" },
      ]}
      onPress={onPress}
      underlayColor={`${color ? color : standartButtonColor}55`}
    >
      <Text
        style={[styles.text, { color: color ? color : standartButtonColor }]}
      >
        {label}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
