import { Text, View, StyleSheet } from "react-native";

import { useContext } from "react";
import { ThemeContext } from "../../../contexts/Theme";

export default function History({ values, operation }) {
  const { isDark } = useContext(ThemeContext);
  const [op1, op2] = values;
  return (
    <View style={styles.lastOperation}>
      <Text style={[styles.text, { color: isDark ? "#FCFDFD" : "#222" }]}>
        {op1 != null && op1}
      </Text>
      <Text style={[styles.text, { color: "#b4757c" }]}>{operation}</Text>
      <Text style={[styles.text, { color: isDark ? "#FCFDFD" : "#222" }]}>
        {op2 || ""}
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
    fontSize: 25,
    color: "#FCFDFD",
  },
});
