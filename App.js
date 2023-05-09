import { useState, useEffect } from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";

import { ButtonHighlight as Button, ToggleThemeButton } from "./src/components";
import { Keyboard, Display } from "./src/components/layout";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import ThemeProvider from "./src/contexts/Theme";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [null, null],
  current: 0,
};

export default function App() {
  let [state, setState] = useState({ ...initialState });

  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  function addDigit(digit) {
    if (digit === "." && state.displayValue.includes(".")) return;

    const clearDisplay = state.displayValue === "0" || state.clearDisplay;
    const currentValue = clearDisplay ? "" : state.displayValue;
    const displayValue = currentValue + digit;
    setState((prevState) => ({
      ...prevState,
      displayValue,
      clearDisplay: false,
    }));

    if (digit !== ".") {
      const i = state.current;
      const newValue = parseFloat(displayValue);
      const values = state.values;
      values[i] = newValue;
      setState((prevState) => ({ ...prevState, values }));
    }
  }

  function clearMemory() {
    setState({ ...initialState });
  }

  function setOperation(operation) {
    if (state.current === 0) {
      setState((prevState) => ({
        ...prevState,
        operation: operation,
        current: 1,
        clearDisplay: true,
        displayValue: "",
      }));
    } else {
      const equals = operation === "=";
      const currentOperation = state.operation;

      const values = [...state.values];
      values[0] = resolve(currentOperation, values);
      values[1] = 0;

      setState((prevState) => ({
        ...prevState,
        clearDisplay: !equals,
        current: equals ? 0 : 1,
        displayValue: values[0],
        operation: equals ? null : operation,
        values: [...values],
      }));
    }
  }

  function resolve(op, operands) {
    if (op === "+") return operands[0] + operands[1];
    else if (op === "-") return operands[0] - operands[1];
    else if (op === "*") return operands[0] * operands[1];
    else if (op === "/") {
      if (operands[1] !== 0) {
        return operands[0] / operands[1];
      } else {
        return "Math ERROR";
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ToggleThemeButton value={theme !== "dark"} onToogle={toggleTheme} />
        <Display>
          <Display.History values={state.values} operation={state.operation} />
          <Display.Result value={state.displayValue} />
        </Display>
        <Keyboard>
          <Keyboard.Row>
            <Button label="AC" color="#2eeec4" onPress={clearMemory} />
            <Button label="+/-" color="#2eeec4" onPress={() => {}} />
            <Button label="%" color="#2eeec4" onPress={() => {}} />
            <Button
              label="/"
              color="#b4757c"
              onPress={() => setOperation("/")}
            />
          </Keyboard.Row>
          <Keyboard.Row>
            <Button label="7" onPress={() => addDigit("7")} />
            <Button label="8" onPress={() => addDigit("8")} />
            <Button label="9" onPress={() => addDigit("9")} />
            <Button
              label="x"
              color="#b4757c"
              onPress={() => setOperation("*")}
            />
          </Keyboard.Row>
          <Keyboard.Row>
            <Button label="4" onPress={() => addDigit("4")} />
            <Button label="5" onPress={() => addDigit("5")} />
            <Button label="6" onPress={() => addDigit("6")} />
            <Button
              label="-"
              color="#b4757c"
              onPress={() => setOperation("-")}
            />
          </Keyboard.Row>
          <Keyboard.Row>
            <Button label="1" onPress={() => addDigit("1")} />
            <Button label="2" onPress={() => addDigit("2")} />
            <Button label="3" onPress={() => addDigit("3")} />
            <Button
              label="+"
              onPress={() => setOperation("+")}
              color="#b4757c"
            />
          </Keyboard.Row>
          <Keyboard.Row>
            <Button
              label={<FontAwesome name="undo" size={18} color="#fff" />}
              onPress={() => {}}
            />
            <Button label="0" onPress={() => addDigit("0")} />
            <Button label="." onPress={() => addDigit(".")} />
            <Button
              label="="
              color="#b4757c"
              onPress={() => setOperation("=")}
            />
          </Keyboard.Row>
        </Keyboard>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22252e",
  },
});
