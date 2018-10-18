/*
*@brief control basico line
*@author Hector E. Socarras
*@date 11/01/2016
*/

var Control  = require('../control');

var Animations = require('../properties/animation/animations');

module.exports = class Polyline extends Control {    
    constructor(name){
        super(name);
        //style properties
        //borde redondeado etc;
        
        //Border Properties
        this.borderType = 'solid';
        this.borderThicknes = 1;//en pixeles
        this.borderColor = 'black';
        //arrow properties vanen style
        
        //position properties Array de dospuntos [0] start point [1]end poi
        this.nodes = new Array(2);
        
        //behavior properies(sealed)
        //this.isClickable = false;//sellarlo
        
        //Animation Properties
        //this.backgroundColorAnimation = new Animations.BackgroundColor(this);
    }
    
    CreateView(container){
        //@param objeto jquery contendor del control
        
        var self = this;
        
        var parentContainer = container;
        parentContainer.append("<div type=control name="+self.name+"></div>");
        
        var control =  parentContainer.children("[name="+self.name+"]");
        
        //SVG Item using Snap Svg
        control.append("<svg xmlns=http://www.w3.org/2000/svg></svg>");        
        var svgDOM = control.children("svg").get(0);        
        var Drawing = Snap(svgDOM);
        
        //Nucleo del control(Puede ser un SVG o jquery funcion)
        control.Core = Drawing;
        
        this.view = control;
        
        //Init Animations
        //this.backgroundColorAnimation.defaultValue = this.backgroundColor;
        
        //evaluo todas las animaciones
        //this.Animate();
        
        //add Behavior
        
        this.Draw();
    }
    
    Draw(){
        
        var self = this;
        
        var Control = this.view;
        
        //Pos in screen
        /*let xPos = null;
        let yPos = null;
        let width = null;
        let height = null;
        
        if(self.points[0].xPos >= self.points[1].xPos){
            xPos = self.points[1].xPos;
            width = (self.points[0].xPos - self.points[1].xPos) + self.lineThicknes;
        }
        else{
            xPos = self.points[0].xPos;
            width = self.points[1].xPos - self.points[0].xPos + self.lineThicknes;
        }
        if(self.points[0].yPos >= self.points[1].yPos){
            yPos = self.points[1].xPos;
            height = (self.points[0].yPos - self.points[1].yPos) + self.lineThicknes;
        }
        else{
            yPos = self.points[0].yPos;
            height = self.points[1].yPos - self.points[0].yPos + self.lineThicknes;
        }
        */
        //Position Properties
        Control.css({
            "position":"absolute",
            "left":self.xPos,
            "top":self.yPos,
            "width":self.width,
            "height":self.height,
            "visibility": self.visibility
        })
        
                
        Control.Core.Line = Control.Core.line(0,0, self.width,self.height).attr({
            stroke: self.borderColor,
            strokeWidth: self.borderThicknes
        }); 
               
    };
    
    Refresh(){
        if(this.animatable){
            //salvo el estado actual del objeto
            let prevStatus = {
                //'visibility':this.visibility,
                //'backgroundColor':this.backgroundColor
            }
            //evaluo todas las animaciones
            this.Animate();
            /*
            //comparo buscando un cambio
            for(var element in prevStatus){
                if(prevStatus[element] != this[element]){
                    this.Draw();
                    break;
                }
            }
            */
        }
    }
    
    Animate(){
        if(this.animatable){
            this.visibilityAnimation.action();
            this.backgroundColorAnimation.action();
        }
    }
    
}