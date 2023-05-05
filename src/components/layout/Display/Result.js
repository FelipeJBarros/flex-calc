import { Text, StyleSheet } from "react-native";

export default function Result({ value }) {
  return <Text style={styles.text}>{value}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "monospace",
    fontWeight: "900",
    fontSize: 50,
    color: "#FCFDFD",
  },
});
