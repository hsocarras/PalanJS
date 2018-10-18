/*
*@brief control basico line
*@author Hector E. Socarras
*@date 11/01/2016
*/

import Widget  from '../widget.js';

 export default class Line extends Widget {
    constructor(lcfg){
        super(lcfg);
        //style properties
        //borde redondeado etc;


        //arrow properties van en style

        //position properties Array de dospuntos [0] start point [1]end poi
        this.points = new Array(2);
        this.points[0]  = lcfg.StartPoint;
        this.points[1] = lcfg.EndPoint;

       if((lcfg.EndPoint.X - lcfg.StartPoint.X) > 0){
            this.X = lcfg.StartPoint.X;
            this.width = lcfg.EndPoint.X - lcfg.StartPoint.X;
        }
        else{
            this.X = lcfg.EndPoint.X;
            this.width = lcfg.StartPoint.X - lcfg.EndPoint.X;
        }

        if((lcfg.EndPoint.Y - lcfg.StartPoint.Y) > 0){
            this.Y = lcfg.StartPoint.Y;
            this.height = lcfg.EndPoint.Y - lcfg.StartPoint.Y;
        }
        else{
            this.Y = lcfg.EndPoint.Y;
            this.height = lcfg.StartPoint.Y - lcfg.EndPoint.Y;
        }

        //behavior properies(sealed)
        //this.isClickable = false;//sellarlo

        //Animation Properties
        //this.backgroundColorAnimation = new Animations.BackgroundColor(this);
    }



    _CreateView(container){
        var self = this;

		let view = SVG(container);
        view.attr({
			id: self.id,
			type : 'line',
			name: self.name,
			width: self.width,
			height: self.height
		});
        view.attr('style', "position:absolute; top:" + self.Y.toString() + "px; left:" + self.X.toString() + "px;")

        let x1 = this.points[0].X - this.X;
        let y1 = this.points[0].Y - this.Y;
        let x2 = this.points[1].X - this.X;
        let y2 = this.points[1].Y - this.Y;

        view._line = view.line(x1, y1, x2, y2).stroke("#030303");
    }

  

}
