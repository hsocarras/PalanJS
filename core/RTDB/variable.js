

import Wiring from "../../libs/wiring.io/dist/wiring.io-es6.js";
import EventEmitter from '../../libs/es-event-emitter/src/event-emitter.js';


export class Variable extends EventEmitter {
  constructor(){
    super()

    this.value = 0;
    this.ValueChange = Wiring.Signal();
    this.ValueBadStatus = Wiring.Signal();
  }
}
