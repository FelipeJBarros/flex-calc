import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

const symbols = {
  operators: ["÷", "×", "-", "+", "="],
};

function Button({ children, onPress, color = "#FCFDFD" }) {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor={`${color}55`}
    >
      <Text
        style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          textAlignVertical: "center",
          color: color,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {children}
      </Text>
    </TouchableHighlight>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <View style={styles.lastOperation}>
          <Text style={[styles.text]}>308</Text>
          <Text style={[styles.text, { color: "#b4757c" }]}>×</Text>
          <Text style={[styles.text]}>42</Text>
        </View>
        <Text style={[styles.text, { fontSize: 50 }]}>12936</Text>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Button onPress={() => {}} color="#2eeec4">
              AC
            </Button>
            <Button onPress={() => {}} color="#2eeec4">
              +/-
            </Button>
            <Button onPress={() => {}} color="#2eeec4">
              %
            </Button>
            <Button onPress={() => {}} color="#b4757c">
              /
            </Button>
          </View>
          <View style={styles.row}>
            <Button onPress={() => {}}>7</Button>
            <Button onPress={() => {}}>8</Button>
            <Button onPress={() => {}}>9</Button>
            <Button onPress={() => {}} color="#b4757c">
              x
            </Button>
          </View>
          <View style={styles.row}>
            <Button onPress={() => {}}>4</Button>
            <Button onPress={() => {}}>5</Button>
            <Button onPress={() => {}}>6</Button>
            <Button onPress={() => {}} color="#b4757c">
              --
            </Button>
          </View>
          <View style={styles.row}>
            <Button onPress={() => {}}>1</Button>
            <Button onPress={() => {}}>2</Button>
            <Button onPress={() => {}}>3</Button>
            <Button onPress={() => {}} color="#b4757c">
              +
            </Button>
          </View>
          <View style={styles.row}>
            <Button onPress={() => {}}>R</Button>
            <Button onPress={() => {}}>0</Button>
            <Button onPress={() => {}}>.</Button>
            <Button onPress={() => {}} color="#b4757c">
              =
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22252e",
  },
  screen: {
    flex: 1,
    margin: 25,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
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
  controlsContainer: {
    flex: 2,
    flexDirection: "row",
    gap: 20,
    backgroundColor: "#292d36",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 20,
  },
  column: {
    flex: 1,
    gap: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#272b34",
    borderRadius: 10,
  },
});
