import { StyleSheet, Text, View } from "react-native";
import { ButtonHighlight as Button } from "./src/components";
import { Keyboard, Display } from "./src/components/layout";

function addDigit(digit) {
  console.log(digit);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Display>
        {/* <Display.History /> */}
        <Display.Result value={12936} />
      </Display>
      <Keyboard>
        <Keyboard.Row>
          <Button label="AC" color="#2eeec4" onPress={() => addDigit("AC")} />
          <Button label="+/-" color="#2eeec4" onPress={() => {}} />
          <Button label="%" color="#2eeec4" onPress={() => {}} />
          <Button label="/" color="#b4757c" onPress={() => {}} />
        </Keyboard.Row>
        <Keyboard.Row>
          <Button label="7" onPress={() => {}} />
          <Button label="8" onPress={() => {}} />
          <Button label="9" onPress={() => {}} />
          <Button label="x" color="#b4757c" onPress={() => {}} />
        </Keyboard.Row>
        <Keyboard.Row>
          <Button label="4" onPress={() => {}} />
          <Button label="5" onPress={() => {}} />
          <Button label="6" onPress={() => {}} />
          <Button label="-" color="#b4757c" onPress={() => {}} />
        </Keyboard.Row>
        <Keyboard.Row>
          <Button label="1" onPress={() => {}} />
          <Button label="2" onPress={() => {}} />
          <Button label="3" onPress={() => {}} />
          <Button label="+" onPress={() => {}} color="#b4757c" />
        </Keyboard.Row>
        <Keyboard.Row>
          <Button label="R" onPress={() => {}} />
          <Button label="0" onPress={() => {}} />
          <Button label="." onPress={() => {}} />
          <Button label="=" color="#b4757c" onPress={() => {}} />
        </Keyboard.Row>
      </Keyboard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22252e",
  },
});
