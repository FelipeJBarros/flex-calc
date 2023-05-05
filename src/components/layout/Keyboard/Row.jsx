import { StyleSheet, View } from "react-native";

export default function KeyboardRow({ children }) {
  return (
    <View style={styles.row}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },
});