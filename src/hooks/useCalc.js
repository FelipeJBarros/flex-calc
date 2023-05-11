import { useState } from "react";

const MAX_LENGTH = 9;

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  values: [0, null],
  operation: null,
  current: 0,
};

export default function useCalc() {
  let [state, setState] = useState({ ...initialState });
  let [history, setHistory] = useState([]);

  function canAddDigit(digit) {
    if (String(state.values[state.current]).length >= MAX_LENGTH) return false;
    if (digit === "." && state.displayValue.includes(".")) return false;
    return true;
  }

  function getCurrentValueCloneWith(newValue) {
    let currentPosition = state.current;
    let copyValues = [...state.values];

    copyValues[currentPosition] = newValue;

    return copyValues;
  }

  function updateHistory() {
    if (state.values[0] !== null && state.values[1] !== null) {
      let copyHistory = [...history];
      copyHistory.push({
        values: [...state.values],
        operation: state.operation,
      });
      setHistory(copyHistory);
    }
  }

  function addDigit(digit) {
    if (state.values[0] === "MATH ERROR") return;
    if (!canAddDigit(digit)) return;

    const clearDisplay = state.displayValue === "0" || state.clearDisplay;
    const currentValue = clearDisplay ? "" : state.displayValue;
    const displayValue = currentValue + digit;

    setState((prevState) => ({
      ...prevState,
      displayValue,
      clearDisplay: false,
    }));

    if (digit !== ".") {
      const newValue = parseFloat(displayValue);
      const updatedCloneValues = getCurrentValueCloneWith(newValue);
      setState((prevState) => ({ ...prevState, values: updatedCloneValues }));
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

      updateHistory();

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
    let newValue;

    switch (op) {
      case "+":
        newValue = operands[0] + operands[1];
        break;
      case "-":
        newValue = operands[0] - operands[1];
        break;
      case "×":
        newValue = operands[0] * operands[1];
        break;
      case "%":
        newValue = operands[0] % operands[1];
        break;
      case "÷":
        if (operands[1] !== 0) {
          newValue = operands[0] / operands[1];
        } else {
          return "MATH ERROR";
        }
        break;
    }

    return Number(String(newValue).slice(0, MAX_LENGTH));
  }

  function removeLastDigit() {
    if (state.values[0] === "MATH ERROR") return;
    let currentValue = String(state.values[state.current]);
    let haveDigitToRemove = currentValue.length - 1 > 0;
    let newValue = haveDigitToRemove
      ? currentValue.substring(0, currentValue.length - 1)
      : "0";
    newValue = Number(newValue);
    const updatedCloneValues = getCurrentValueCloneWith(newValue);
    setState((prevState) => ({
      ...prevState,
      values: updatedCloneValues,
      displayValue: String(newValue),
    }));
  }

  function toogleSign() {
    if (state.values[0] === "MATH ERROR") return;
    let currentValue = state.values[state.current];
    const updatedCloneValues = getCurrentValueCloneWith(currentValue * -1);

    setState((prevState) => ({
      ...prevState,
      values: updatedCloneValues,
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
