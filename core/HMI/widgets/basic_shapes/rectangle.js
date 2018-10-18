/*
*@brief control basico rectangle
*@author Hector E. Socarras
*@date 11/01/2016
*/

import Widget  from '../widget.js';



export default class Rectangle extends Widget {
    constructor(rcfg){
        super(rcfg);
        //style properties
        //borde redondeado etc;

        //Contorno Properties
        this.borderType = rcfg.borderType || 'solid';
        this.borderThicknes = rcfg.borderThicknes || 1;//en pixeles
        this.borderColor = rcfg.borderColor || 'black';

        //Background Properties
        this.texture = rcfg.texture || null;
        //Back color
        this.backgroundColor = rcfg.backgroundColor || 'white';
        //transparency level.
        this.transparency= 0;
        //Habilitar Gradiente
        //this.enableGradient = false;
        //Definir n la proxima version
        //this.Gradient = {};




    }

    _CreateView(container){
        var self = this;
        //let view = $('<svg xmlns=http://www.w3.org/2000/svg type=Rectangle id=' + this.id + ' name=' + this.name + '></svg>');
        //container.append(view);

        let view = document.createElement("svg");
        view.setAttribute("type", "Rectangle");
        view.setAttribute("id", self.id);
        view.setAttribute("name", self.name);
        view.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        container.appendChild(view);



        /*
        var self = this;

        var parentContainer = container;
        //parentContainer.append("<div type=control name="+self.name+"></div>");

        var control =  parentContainer.children("[name="+self.name+"]");

        //SVG Item using Snap Svg
        return "<svg xmlns=http://www.w3.org/2000/svg height="+self.height+" width="+self.width+"></svg>";

        var svgDOM = control.children("svg").get(0);
        var Drawing = Snap(svgDOM);

        //Nucleo del control(Puede ser un SVG o jquery funcion)
        control.Core = Drawing;

        this.view = control;

        //Init Animations
        this.backgroundColorAnimation.defaultValue = this.backgroundColor;

        //evaluo todas las animaciones
        this.Animate();

        //add Behavior

        this.Draw();
        */
    }

  

}
