import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export function ToggleThemeButton({ value, onToogle }) {
  return (
    <View style={styles.container}>
      <View
        onTouchStart={onToogle}
        style={[
          styles.innerButton,
          { backgroundColor: !value ? "#292d36" : "#F9F9F9" },
        ]}
      >
        <Feather name="sun" size={24} color={value ? "#4b4f56" : "#444750"} />
        <FontAwesome
          name="moon-o"
          size={24}
          color={value ? "#dfdfe1" : "#e0e0e0"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 8,
  },
  innerButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 20,
    borderRadius: 12,
  },
});
