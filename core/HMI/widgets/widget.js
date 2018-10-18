/*
*@brief objeto basico del que heredan todos los widgets de HMI
*@author Hector E. Socarras
*@date 11/01/2016
*/

import Wiring  from "../../../libs/wiring.io/dist/wiring.io-es6.js";
import EventEmitter from '../../../libs/es-event-emitter/src/event-emitter.js';

//var Property = require('../property');



 class Widget extends EventEmitter {
    constructor(wcfg){
        super();
        var self = this;

        //General Properties
        //contiene el nombre del objeto. un objeto puede tener igual nombre en distinto sinopticos. coincide con el nombre de la instancia
        const _name = wcfg.name;
        Object.defineProperty(self, 'name',{
            get: function(){
                return _name;
            }
        })

        // contiene un identificador unico a todo el projecto, nigun otro objeto puede tener la propiedad id con el mismo valor
        const _id = wcfg.id;
        Object.defineProperty(self, 'id',{
            get: function(){
                return _id;
            }
        })

        //string con el tooltip del objeto;
        this.tooltip = wcfg.tooltip || '';

        //Position Properties
        this.X = wcfg.X || 10;
        this.Y  = wcfg.Y || 10;
        this.width = wcfg.width || 40;
        this.height = wcfg.height || 40;
        this.layer = wcfg.layer ||0;
       // this.rotationAngle = 0;
        /*
        this.baricenter = {
            x:this.xPos + this.width/2,
            y:this.yPos + this.height/2
        }
        */

        //Border Properties
        this.borderType = wcfg.borderType || 'solid';
        this.borderThicknes = wcfg.borderThicknes || 1;//en pixeles
        this.borderColor = wcfg.borderColor || 'black';

        //slot for signals
        this.slot1 = Wiring.Slot(self);
        this.slot1.SetChannel('Tick_100', self.Refresh100MS);


        //Objeto Grafico
        this.view = null;

    }

    Refresh100MS(){
      console.log('tick');
    }

}


export default Widget;
