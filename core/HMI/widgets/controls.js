/*
*@brief objeto que exporta todos los controles disponibles 
*@author Hector E. Socarras
*@date 11/01/2016
*/

import TEXT from './basic_shapes/label.js';

import RECTANGLE from './basic_shapes/rectangle.js';

import LINE from './basic_shapes/line.js';


export var Controls = function(){
    class Controls {
        constructor(){
            
            this.controlsStack = new Map();
            
            this.controlsStack.set('Text', TEXT)
            this.controlsStack.set('Rectangle', RECTANGLE)
            this.controlsStack.set('Line', LINE)
            
           
            
            //get Instance method in singleton design
            this.GetInstance = function(){
                return this;
            }
        }
        
        //Api functions to add customs controls to be implemented later
    }
    return new Controls();
}();