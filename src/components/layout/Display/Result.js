import { Text, StyleSheet } from "react-native";

import { useContext } from "react";
import { ThemeContext } from "../../../contexts/Theme";

export default function Result({ value }) {
  const { isDark } = useContext(ThemeContext);

  return (
    <Text style={[styles.text, { color: isDark ? "#FCFDFD" : "#222" }]}>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "monospace",
    fontWeight: "900",
    fontSize: 50,
    color: "#FCFDFD",
  },
});
