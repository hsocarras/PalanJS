/*
*@brief control basico input de el heredan list etc
*@author Hector E. Socarras
*@date 11/01/2016
*/

var Control  = require('../control');

var Animations = require('../properties/animation/animations');

module.exports = class Input extends Control {    
    constructor(name){
        super(name);
        //style properties
        //borde redondeado etc;
        
        //Contorno Properties
        this.borderType = 'solid';
        this.borderThicknes = '1px';//en pixeles
        this.borderColor = 'black';
        
        //Background Properties
        this.texture = null;
        //Back color
        this.backgroundColor = 'white';
        //transparency level.
        this.transparency= 0;
        
        //input properties
        this.type = 'number'//fixed for now
        this.readOndly = false;
        this.disable = false;
        this.value = 0;
        this.variable = '';
        
        //Behavior properties
        this.clikable = true;
        this.animatable = true;
        
        
        //comand properies
        //this.onClick = function(){};
        //this.onDClick = function(){};        
        
        //Animation Properties
        //this.backgroundColorAnimation = new Animations.BackgroundColor(this);
    }
    
     CreateView(container){
        //@param objeto jquery contendor del control
        
        var self = this;
        
        var parentContainer = container;
        parentContainer.append("<div type=control name="+self.name+"></div>");
        
        var control =  parentContainer.children("[name="+self.name+"]");
        
        //jquery
        control.append('<input type="number"></input>'); ;        
        var Input = control.children("input");        
                
        //Nucleo del control(Puede ser un SVG o jquery funcion)
        control.Core = Input;
        
        this.view = control;
        
        //Init Animations
        //this.backgroundColorAnimation.defaultValue = this.backgroundColor;
        
        //evaluo todas las animaciones
        this.Animate();
        
        //add Behavior
        //Adding listening for mouse event
        if(self.clikable == true){
            if(self.onClick != null && typeof(self.onClick) == 'function'){                
                //control.Core.click(self.onClick);
            }
            if(self.onDblClick != null && typeof(self.onDblClick) == Function){                
                //control.Core.dblclick(self.onDblClick);
            }
        }
        
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
        
        
        //styling Input
        Control.Core.val(self.value)
        Control.Core.css({
            "width":self.width,
            "height":self.height,
            "border": self.borderThicknes+' '+ self.borderType +' '+ self.borderColor            
        });        
             
    };
    
    Refresh(){
        let prevStatus = {
            'visibility':this.visibility,
            'value':this.value
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
    
    Animate(){
        //this.value = String(window[self.variable].value);
        
    }
    
    Freeze(){
        //cancelo la animacion de mostrar valor cuando esta seleccionado este conrol
    }
    
}