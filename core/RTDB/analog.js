
import {Variable} from "./variable.js"

export default class AnalogVariable extends Variable{
  constructor(){
    super()

    this.engUnit;
  }

  get VariableValue () {
    return this.value
  }

  set VariableValue (value) {
    this.value = value;
  }
}
