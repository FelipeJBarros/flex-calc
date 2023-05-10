import { Text, View, StyleSheet } from "react-native";

import { useContext } from "react";
import { ThemeContext } from "../../../contexts/Theme";

export default function History({ data }) {
  const { isDark } = useContext(ThemeContext);
  const { values, operation, current, displayValue } = data;

  return (
    <View style={styles.lastOperation}>
      <Text style={[styles.text, { color: isDark ? "#FCFDFD" : "#222" }]}>
        {values[0]}
      </Text>
      <Text style={[styles.text, { color: "#b4757c" }]}>{operation}</Text>
      <Text style={[styles.text, { color: isDark ? "#FCFDFD" : "#222" }]}>
        {values[1]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lastOperation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontFamily: "monospace",
    fontWeight: "900",
    fontSize: 20,
    color: "#FCFDFD",
  },
});
