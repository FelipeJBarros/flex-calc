import { View, StyleSheet } from "react-native";
import History from "./History";
import Result from "./Result";

export default function Display({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

Display.Result = Result;
Display.History = History;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 25,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  text: {
    fontFamily: "monospace",
    fontWeight: "900",
    fontSize: 25,
    color: "#FCFDFD",
  },
});