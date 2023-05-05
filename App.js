import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { ButtonHighlight as Button } from "./src/components";
import { Keyboard, Display } from "./src/components/layout";

export default function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [lastDigit, setLastDigit] = useState("0");
  const [haveToClearDisplay, setHaveToClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [operators, setOperators] = useState([0, 0]);
  const [currentOperatorIndex, setCurrentOperatorIndex] = useState(0);

  function clearMemory() {
    setDisplayValue("0");
    setHaveToClearDisplay(false);
    setOperation(null);
    setOperators([0, 0]);
    setCurrentOperatorIndex(0);
  }

  function addDigit(digit) {
    if (digit === "." && displayValue.includes(digit)) return;

    if (displayValue.length >= 9) return;

    const clearDisplay = displayValue === "0" || haveToClearDisplay;
    const currentValue = clearDisplay ? "" : displayValue;

    setDisplayValue(currentValue + digit);
    setLastDigit(digit);
  }

  useEffect(() => {
    if (lastDigit !== ".") {
      const newValue = Number.parseFloat(displayValue);
      const values = [...operators];
      values[currentOperatorIndex] = newValue;
      setOperators(values);
    }
  }, [displayValue]);

  return (
    <View style={styles.container}>
      <Display>
        <Display.History op1={operators[0]} op2={operators[1]} />
        <Display.Result value={displayValue} />
      </Display>
      <Keyboard>
        <Keyboard.Row>
          <Button label="AC" color="#2eeec4" onPress={clearMemory} />
          <Button label="+/-" color="#2eeec4" onPress={() => {}} />
          <Button label="%" color="#2eeec4" onPress={() => {}} />
          <Button label="/" color="#b4757c" onPress={() => {}} />
        </Keyboard.Row>
        <Keyboard.Row>
          <Button label="7" onPress={() => addDigit("7")} />
          <Button label="8" onPress={() => addDigit("8")} />
          <Button label="9" onPress={() => addDigit("9")} />
          <Button label="x" color="#b4757c" onPress={() => {}} />
        </Keyboard.Row>
        <Keyboard.Row>
          <Button label="4" onPress={() => addDigit("4")} />
          <Button label="5" onPress={() => addDigit("5")} />
          <Button label="6" onPress={() => addDigit("6")} />
          <Button label="-" color="#b4757c" onPress={() => {}} />
        </Keyboard.Row>
        <Keyboard.Row>
          <Button label="1" onPress={() => addDigit("1")} />
          <Button label="2" onPress={() => addDigit("2")} />
          <Button label="3" onPress={() => addDigit("3")} />
          <Button label="+" onPress={() => {}} color="#b4757c" />
        </Keyboard.Row>
        <Keyboard.Row>
          <Button label="R" onPress={() => {}} />
          <Button label="0" onPress={() => addDigit("0")} />
          <Button label="." onPress={() => addDigit(".")} />
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
