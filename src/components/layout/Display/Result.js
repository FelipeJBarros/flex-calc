import { Text, StyleSheet } from "react-native";

import { useContext } from "react";
import { ThemeContext } from "../../../contexts/Theme";

export default function Result({ value, placeholder }) {
  const { isDark } = useContext(ThemeContext);

  let hasPlaceholder = value === "";

  return (
    <Text
      style={[
        styles.text,
        { color: hasPlaceholder ? "#777" : isDark ? "#FCFDFD" : "#222" },
      ]}
    >
      {value || placeholder}
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
