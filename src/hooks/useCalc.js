import { useEffect, useState } from "react";

const MAX_LENGTH = 9;

const initialState = {
  displayValue: "0",
  virtualResult: null,
  clearDisplay: false,
  operation: null,
  values: [null, null],
  current: 0,
};

export default function useCalc() {
  let [state, setState] = useState({ ...initialState });

  useEffect(() => {
    if (state.values[1] === null) {
      setState((prevState) => ({ ...prevState, virtualResult: "" }));
      return;
    }

    let virtualResult = resolve(state.operation, state.values);

    setState((prevState) => ({
      ...prevState,
      virtualResult,
    }));
  }, [state.values[0], state.values[1]]);

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
    setState({ ...initialState, values: [null, null] });
  }

  function setOperation(operation) {
    if (state.current === 0) {
      setState((prevState) => ({
        ...prevState,
        operation: operation,
        current: 1,
        clearDisplay: true,
      }));
    } else {
      const equals = operation === "=";
      const currentOperation = state.operation;

      const values = [...state.values];
      values[0] = resolve(currentOperation, values);
      values[1] = null;

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
        return "NaN";
      }
    }
  }

  return {
    data: state,
    addDigit,
    clearMemory,
    setOperation,
  };
}
