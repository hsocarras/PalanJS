import {Variable} from "./variable.js"

export default class DigitalVariable extends Variable{
  constructor(){
    super()


  }

  get VariableValue () {
    return this.value
  }

  set VariableValue (value) {
    this.value = value;
  }
}
