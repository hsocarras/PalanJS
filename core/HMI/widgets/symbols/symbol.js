/*
*@brief clase symbolo
*@author Hector E. Socarras
*@date 11/01/2016
*/

var Control  = require('../control');

var Animations = require('../properties/animation/animations');

module.exports = class Symbol extends Control {    
    constructor(name){
        super(name);
           
        
        //colection off images podran ser svg preferentemente, png, jpg compatibles con el navegador.
        this.image = 'url';        
        
        this.OnOffAnimation = new Animations.OnOffAnimation(this);
        
        //behavior properies
        this.isClickable;
        
        //comand properies
        this.onClick = function(){};
        this.onDClick = function(){};
        
    }
    
    CreateView(container){
        //@param objeto jquery contendor del control
        
        var self = this;
        
        var parentContainer = container;
        parentContainer.append("<div type=control name="+self.name+"></div>");
        
        var control =  parentContainer.children("[name="+self.name+"]");
        
        //jquery Item using Snap Svg
        control.append("<img></img>");      
        var Img = control.children("img");        
        
        
        //Nucleo del control(Puede ser un SVG o jquery funcion)
        control.Core = Img;
        
        this.view = control;
        
        //Init Animations
        
        
        //evaluo todas las animaciones
        this.Animate();
        
        //add Behavior
        
        this.Draw();
    }
    
    Draw(){
        
        var self = this;
        
        var Control = this.view;
        
        //Position Properties        
        Control.css({
            "position":"absolute",
            "left":self.xPos,
            "top":self.yPos,
            "width":self.width,
            "height":self.height,
            "visibility": self.visibility
        })
        
        Control.Core.attr('src', self.image);
        Control.Core.css({
            "width":self.width,
            "height":self.height
        });
             
    };  
    
    Refresh(){
        if(this.animatable){
            //salvo el estado actual del objeto
            let prevStatus = {
                'visibility':this.visibility,
                'image':this.image
            }
            //evaluo todas las animaciones
            this.Animate();
            //comparo buscando un cambio
            for(var element in prevStatus){
                if(prevStatus[element] != this[element]){
                    this.Draw();
                    break;
                }
            }
        }
        
    }
    
    Animate(){
        if(this.animatable){
            //Executing Animations
            this.visibilityAnimation.action();
            this.OnOffAnimation.action();
        }
    }
    
}