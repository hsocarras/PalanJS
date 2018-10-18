

import EM from '../../libs/es-event-emitter/src/event-emitter.js';
import Analog from './analog.js';
import Digital from './digital.js';

export var RTDB = function (){

  class RTDB extends EM {
    constructor(){
      super();

      this.variables = {};

      //get Instance method in singleton design
      this.GetInstance = function(){
          return this;
      }
    }

    Load(rcfg){

      var self = this;
      var url = './variables.pvrb';

      let tempVariable;

      $.getJSON(url, function( json ) {
        for(let variable in json){
          let type = json[variable].Type;
            switch (type) {
              case "AnalogVariable":
                tempVariable = new Analog()
                tempVariable.engUnit = json[variable].EngUnit;
                self._AddVariable(variable, tempVariable)
                break;
              case "DigitalVariable":
                tempVariable = new Digital()
                self._AddVariable(variable, tempVariable)
                break;
              default:

            }
        }
      });
    }

    _AddVariable(name, variable){
      let self = this;
      this.variables[name] = variable;

      Object.defineProperty(Global, name,{
        get:function(){
          return self.variables[name].value;
        },
        set:function(value){
          //temporal el setter debe mandar a escribir no manipular el value
          self.variables[name].value = value;
        }
      })
      
    }
  }

  return new RTDB();
}();
