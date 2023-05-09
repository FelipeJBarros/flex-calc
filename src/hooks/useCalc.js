import { useEffect, useState } from "react";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [null, null],
  current: 0,
  virtualResult: "",
};

const MAX_LENGTH = 9;

export default function useCalc() {
  const [state, setState] = useState({ ...initialState });

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

  function clearMemory() {
    setState({ ...initialState, values: [null, null] });
  }

  function digitIsInvalid(digit) {
    return (
      (digit === "." && state.displayValue.includes(".")) ||
      state.displayValue.length >= MAX_LENGTH
    );
  }

  function addDigit(digit) {
    if (digitIsInvalid(digit)) return;

    const clearDisplay = state.displayValue === "0" || state.clearDisplay;
    const currentValue = clearDisplay
      ? ""
      : state.values[state.current].toString();
    const displayValue = currentValue + digit;

    setState((prevState) => ({
      ...prevState,
      displayValue: null,
      clearDisplay: false,
    }));

    if (digit !== ".") {
      const i = state.current;
      const newValue = parseFloat(displayValue);
      const values = state.values;
      values[i] = newValue;
      setState((prevState) => ({ ...prevState, values }));
    }

    setState((prevState) => ({ ...prevState, displayValue: "" }));
  }

  function setOperation(operation) {
    if (state.displayValue === "MATH ERROR") return;
    setState((prevState) => ({ ...prevState, displayValue: "" }));
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
        displayValue: equals ? values[0] : "",
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
        return "MATH ERROR";
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
