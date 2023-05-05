import { Text, TouchableHighlight, StyleSheet } from "react-native";

export function ButtonHighlight({ label, onPress, color = "#FCFDFD" }) {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor={`${color}55`}
    >
      <Text style={[styles.text, { color: color }]}>{label}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "#272b34",
    borderRadius: 1000,
  },
  text: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
