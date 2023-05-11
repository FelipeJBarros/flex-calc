import { useState } from "react";
import { View, Text, StatusBar } from "react-native";

import { ButtonHighlight as Button, ToggleThemeButton } from "./src/components";
import { Keyboard, Display } from "./src/components/layout";

import ThemeProvider from "./src/contexts/Theme";
import useCalc from "./src/hooks/useCalc";

import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const {
    data,
    addDigit,
    removeLastDigit,
    setOperation,
    clearMemory,
    toogleSign,
  } = useCalc();

  let themeValue = theme !== "dark";
  let clearMemoryLabel =
    data.displayValue != "" && data.displayValue != "0" ? "C" : "AC";

  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme === "dark" ? "#22252e" : "#FFF",
        }}
      >
        <StatusBar barStyle="light-content" />
        <ToggleThemeButton value={themeValue} onToogle={toggleTheme} />
        <Display>
          <Display.History data={data.history} />
          <Display.Result data={data} />
        </Display>
        <Keyboard>
          <Keyboard.Row>
            <Button
              label={clearMemoryLabel}
              color="#2eeec4"
              onPress={clearMemory}
            />
            <Button label="+/-" color="#2eeec4" onPress={toogleSign} />
            <Button
              label="%"
              color="#2eeec4"
              onPress={() => setOperation("%")}
            />
            <Button
              label="÷"
              color="#b4757c"
              onPress={() => setOperation("÷")}
            />
          </Keyboard.Row>
          <Keyboard.Row>
            <Button label="7" onPress={() => addDigit("7")} />
            <Button label="8" onPress={() => addDigit("8")} />
            <Button label="9" onPress={() => addDigit("9")} />
            <Button
              label="×"
              color="#b4757c"
              onPress={() => setOperation("×")}
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
              color="#b4757c"
              onPress={() => setOperation("+")}
            />
          </Keyboard.Row>
          <Keyboard.Row>
            <Button
              label={
                <FontAwesome
                  name="undo"
                  size={18}
                  color={theme === "dark" ? "#FCFDFD" : "#222"}
                />
              }
              onPress={() => removeLastDigit()}
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
