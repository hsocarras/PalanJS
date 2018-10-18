/*
*@brief control basico texto
*@author Hector E. Socarras
*@date 11/01/2016
*/

import Widget  from '../widget.js';



export default class Text extends Widget {
    constructor(tcfg){
        super(tcfg);

        //General
        this.value = tcfg.value || '';



        //Text Properties
        this.fontFamily = tcfg.fontFamily || 'Arial';
        this.fontSize = tcfg.fontSize || 10;
        this.fontStyle = tcfg.fontStyle || 'regular';
        this.fontColor = tcfg.fontColor || '#000000';
        this.textAlign = tcfg.textAlign || 'center';

        //behavior properies

        //Animation Properties
        //this.textSise;
        //this.textColor;
        //this.text;
    }

    CreateView(container){
        var self = this;

        let view = document.createElement("p");
        view.setAttribute("type", "Text");
        view.setAttribute("id", self.id);
        view.setAttribute("name", self.name);

        view.style.position = "absolute";
        view.style.left = this.X.toString();
        view.style.top = this.Y.toString();

        view.style.fontFamily = this.fontFamily;
        view.style.fontSize = this.fontSize;

        let textValue = document.createTextNode(this.value)
        view.appendChild(textValue)




    }



}
