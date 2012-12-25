bln_logicBox = function() {
	this.vIn = [
		{	name: "A",
			type: "int",
			value: 1,
			conect: {}
			},
		{	name: "B",
			type: "int",
			value: 1,
			conect: {}
			},
		{	name: "C",
			type: "str",
			value: 1,
			conect: {}
			}	
		]; 
	this.vOut = [
		{	name: "A+B",
			type: "int",
			value: 1,
			conect: {}
			},
		{	name: "B+C",
			type: "int",
			value: 1,
			conect: {}
			}
		];
		
	this.logicFunction = {};
}

bln_logicOut = function() {
	this.vIn = [];
	this.vOut = [
	{	name: "1",
		type: "int",
		value: 1,
		conect: false,
		gui: {}
		}
		];
	this.logicFunction = {};
	this.canConect = function(v,no) {
		if(this[v][no].length == 0) return false;
		return true;
		}
	}
	
bln_logicIn = function() {
	this.vOut = [];
	this.vIn = [
	{	name: "0",
		type: "int",
		value: 0,
		conect: false,
		gui: {}
		}
		];
	this.locCode = function() { this.vIn[0].gui.text.textStr = this.vIn[0].value;}
	this.canConect = function(v,no) {
		if(this[v][no].conect || v == "vOut") return false;
		return true;
		}
	}


bln_logicAdd = function() {
	this.vIn = [
		{	name: "A",
			type: "int",
			value: 0,
			conect: false
			},
		{	name: "B",
			type: "int",
			value: 0,
			conect: false
			}	
			];
	this.vOut = [
		{	name: "+   =",
			type: "int",
			value: 0,
			conect: false
			}
			];	
	this.locCode = function() {
		return this.vOut[0].value = this.vIn[0].value + this.vIn[1].value;
		}
	this.canConect = function(v,no) {
		if(v == "vOut") return true;
		if(!this[v][no].conect) return true;
		return false;
		}
	}
