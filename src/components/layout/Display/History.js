import { Text, View, StyleSheet } from "react-native";

import { useContext } from "react";
import { ThemeContext } from "../../../contexts/Theme";

export default function History({ data }) {
  const { isDark } = useContext(ThemeContext);

  return (
    <>
      {data.map((operation, idx) => (
        <View style={styles.lastOperation} key={idx}>
          <Text style={[styles.text, { color: isDark ? "#FCFDFD" : "#222" }]}>
            {operation.values[0]}
          </Text>
          <Text style={[styles.text, { color: "#b4757c" }]}>
            {operation.operation}
          </Text>
          <Text style={[styles.text, { color: isDark ? "#FCFDFD" : "#222" }]}>
            {operation.values[1]}
          </Text>
        </View>
      ))}
    </>
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
