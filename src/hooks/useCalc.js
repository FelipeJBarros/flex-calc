import { useEffect, useState } from "react";

const MAX_LENGTH = 9;

const initialState = {
  displayValue: "0",
  virtualResult: null,
  clearDisplay: false,
  values: [0, null],
  operation: null,
  current: 0,
};

export default function useCalc() {
  let [state, setState] = useState({ ...initialState });
  let [history, setHistory] = useState([]);

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
    if (state.values[0] === "MATH ERROR") return;
    if (String(state.values[state.current]).length >= MAX_LENGTH) return;
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
    if (state.values[0] === "MATH ERROR") return;
    if (state.values[1] === null && operation === "=") return;
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

      if (state.values[0] !== null && state.values[1] !== null) {
        let copyHistory = [...history];
        copyHistory.push({
          values: [...state.values],
          operation: state.operation,
        });
        setHistory(copyHistory);
      }

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
    else if (op === "×") return operands[0] * operands[1];
    else if (op === "÷") {
      if (operands[1] !== 0) {
        return operands[0] / operands[1];
      } else {
        return "MATH ERROR";
      }
    }
  }

  function removeLastDigit() {
    if (state.values[0] === "MATH ERROR") return;
    let currentValue = String(state.values[state.current]);
    let newValue =
      currentValue.length - 1 > 0
        ? currentValue.substring(0, currentValue.length - 1)
        : "0";
    newValue = Number(newValue);
    const values = state.values;
    values[state.current] = newValue;
    setState((prevState) => ({
      ...prevState,
      values,
      displayValue: String(newValue),
    }));
  }

  function toogleSign() {
    if (state.values[0] === "MATH ERROR") return;
    let currentValue = state.values[state.current];
    const values = state.values;
    values[state.current] = currentValue * -1;
    setState((prevState) => ({
      ...prevState,
      values,
      displayValue: String(currentValue * -1),
    }));
  }

  return {
    data: { ...state, history },
    addDigit,
    clearMemory,
    setOperation,
    removeLastDigit,
    toogleSign,
  };
}
