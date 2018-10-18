/*
*@brief objeto basico del que heredan todas las pantallas
*@author Hector E. Socarras
*@date 11/01/2016
*/

import EM from '../../libs/es-event-emitter/src/event-emitter.js';
import Wiring  from "../../libs/wiring.io/dist/wiring.io-es6.js";
import {PClock} from '../PClock/pclock.js';
import {Controls} from './widgets/controls.js'

export default class Screen {
    constructor(scfg){
        var self = this;

        //Style Properties
        //se adapta al tamano disponible de la patalla des dispositivo si false mantiene las mismas dimensiones
        //this.isAdaptable = false;


        //General Properties
        //Debe coincidir con el nombre de la instancia
        const _name = scfg.name;
        Object.defineProperty(self, 'name',{
            get: function(){
                return _name;
            }
        })

        const _id = scfg.id;
        Object.defineProperty(self, 'id',{
            get: function(){
                return _id;
            }
        })

        const _width = scfg.width || 1024;
        this.width = _width;

        const _height = scfg.height || 768;
        Object.defineProperty(self, 'height',{
            get: function(){
                return _height;
            }
        })


        //Background Properties
        //this.texture = null;
        const _backColor = scfg.backColor || "#FAFAFA";
        Object.defineProperty(self, 'backColor',{
            get: function(){
                return _backColor;
            }
        })

        this._Clock = new PClock();

        //this.image = null;

        //refres time default 200 ms
        //this.refreshTime = 200;
        //this.container

        this._controlsStack = new Map();
        let controlCFG;

        for(let control in scfg.controls){
            controlCFG = scfg.controls[control];
            let controlClass = Controls.controlsStack.get(controlCFG.Type);
            let tempControl = new controlClass(controlCFG)
            Wiring.Connect(this._Clock.tick100, tempControl.slot1, 'Tick_100');
            this._controlsStack.set(controlCFG.name, tempControl);
        }


        //this.View = null;
    }

    /**
    *@return {string} codigo html con la vista de la pantalla
    */
    _CreateView(container){
        var self = this;

        let view = document.createElement("div");
        view.setAttribute("type", "Screen");
        view.setAttribute("id", self.id);
        view.setAttribute("name", self.name);
        view.style.width = this.width.toString() + 'px';
        view.style.height = this.height.toString() + 'px';
        view.style.backgroundColor = this.backColor;
        container.appendChild(view);

        this._controlsStack.forEach(function(val, key){
            val._CreateView(view);

        })


    }




}
