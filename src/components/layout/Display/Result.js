import { Text, View, StyleSheet } from "react-native";

import { useContext } from "react";
import { ThemeContext } from "../../../contexts/Theme";

export default function Result({ data }) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 4,
        flexWrap: "wrap",
        justifyContent: "flex-end",
      }}
    >
      <Text style={[styles.text, { color: isDark ? "#FCFDFD" : "#222" }]}>
        {data.values[0] ? data.values[0] : 0}
      </Text>
      <Text style={[styles.text, { color: "#b4757c" }]}>{data.operation}</Text>
      <Text style={[styles.text, { color: isDark ? "#FCFDFD" : "#222" }]}>
        {data.values[1]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "monospace",
    fontWeight: "900",
    fontSize: 40,
    color: "#FCFDFD",
  },
});
