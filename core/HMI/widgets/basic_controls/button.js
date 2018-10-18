/*
*@brief control basico rectangle
*@author Hector E. Socarras
*@date 11/01/2016
*/

var Control  = require('../control');

var Animations = require('../properties/animation/animations');

module.exports = class Button extends Control {    
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
        
        //Behavior properties
        this.clikable = true;
        this.animatable = false;
        
        
        //comand properies
        this.onClick = null;
        this.onDblClick = null
        this.onPress = null;
        this.onRelease = null;
        
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
        control.append("<button type='button'></button>");        
        var Button = control.children("button");        
                
        //Nucleo del control(Puede ser un SVG o jquery funcion)
        control.Core = Button;
        
        this.view = control;
        
        //Init Animations
        //this.backgroundColorAnimation.defaultValue = this.backgroundColor;
        
        //evaluo todas las animaciones
        this.Animate();
        
        //add Behavior
        //Adding listening for mouse event
        if(self.clikable == true){
            if(self.onClick != null && typeof(self.onClick) == 'function'){                
                control.Core.click(self.onClick);
            }
            if(self.onDblClick != null && typeof(self.onDblClick) == Function){                
                control.Core.dblclick(self.onDblClick);
            }
        }
        
        this.Draw();
    }
    
    Draw(container){
        //@param objeto jquery contendor del control
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
              
        //styling Button
        Control.Core.css({
            "width":self.width,
            "height":self.height,
            "border": self.borderThicknes+' '+ self.borderType +' '+ self.borderColor            
        });
              
    };
    
    Animate(){
        
    }
    
    
}