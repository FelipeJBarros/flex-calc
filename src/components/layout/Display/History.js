import { Text, View, StyleSheet } from "react-native";

export default function History({ operations }) {
  return (
    <View style={styles.lastOperation}>
      <Text style={[styles.text]}>308</Text>
      <Text style={[styles.text, { color: "#b4757c" }]}>×</Text>
      <Text style={[styles.text]}>42</Text>
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
