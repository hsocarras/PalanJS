
import Wiring from "../../libs/wiring.io/dist/wiring.io-es6.js";

export class PClock {
	constructor(){
		let self = this;

		//100 ms
		this._timer100 = null;

		this._timer1000 = null;

		this.tick100 = Wiring.Signal(128);

		this.tick1000 = Wiring.Signal(128);

		this.P100 = 0;
		this.P10000 = 0;


	}

	Start(){
		let self = this;



		this._timer100 = setInterval(function(){

			self.P100 = self.P100 ^ 1;
			self.tick100.Emit(self.P100);

		},100);

		this._timer1000 = setInterval(function(){

			self.P1000 = self.P1000 ^ 1;
			self.tick1000.Emit(self.P1000);

		},1000);


	}

	Stop(){
		let self = this;

		clearInterval(this._timer1000);

		clearInterval(this._timer100);

	}
}
